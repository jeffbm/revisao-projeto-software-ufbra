import test from 'node:test';
import assert from 'node:assert/strict';
import { createOficina } from '../oficina.js';
import { createDatabase } from '../database/db.js';
import { createSchema } from '../database/schema.js';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function ambiente(t,opts={}){
 const env=createOficina({databaseFile:':memory:',...opts});
 t.after(()=>env.db.close());
 const s=env.oficina,auth=env.autenticacaoService;
 const A=auth.login('atendente','123456').usuario,M=auth.login('mecanico','123456').usuario,G=auth.login('gerente','123456').usuario;
 return {...env,s,auth,A,M,G};
}
function cadastro({s,A},placa='ABC1D23'){
 const c=s.salvarCliente(A,{nome:'Cliente de teste',telefone:'12999990000',email:'teste@example.invalid'});
 const v=s.salvarVeiculo(A,{clienteId:c.id,placa,marca:'Fiat',modelo:'Toro',ano:2018});
 return {c,v};
}
function novaOS(e){const {c,v}=cadastro(e);const o=e.s.abrir(e.A,{veiculoId:v.id,quilometragem:12000,relato:'Revisão'});return {c,v,o};}
const estoque=(e,c='P001')=>e.s.pecas(e.G).find(p=>p.codigo===c).estoque;

test('CT21 - cadastro, agenda, atribuição, diagnóstico, serviço, peça, fechamento, histórico e relatório',t=>{
 const e=ambiente(t),{s,A,M,G}=e,{c,v}=cadastro(e);
 const a=s.agendar(A,{veiculoId:v.id,dataHora:'2027-01-05T09:00',motivo:'Revisão'});
 const {numero}=s.alterarAgenda(A,a.id,{acao:'ABRIR_OS',quilometragem:12000,relato:'Troca de óleo'});
 assert.equal(s.agenda(A)[0].status,'CONCLUIDO');assert.equal(s.agenda(A)[0].osNumero,numero);
 assert.equal(s.detalhe(M,numero).status,'ABERTA');s.editarOS(G,numero,'atribuir',{mecanicoId:M.id});
 assert.equal(s.painel(M).minhas,1);s.editarOS(M,numero,'diagnostico',{diagnostico:'Filtro e óleo'});
 s.editarOS(M,numero,'servicos',{descricao:'Mão de obra',quantidade:1,valorUnitario:100});
 const before=estoque(e);let o=s.editarOS(M,numero,'pecas',{codigo:'P001',quantidade:2});
 assert.equal(estoque(e),before-2);assert.equal(o.total,170);assert.equal(o.servicos.length,1);assert.equal(o.pecas.length,1);
 o=s.editarOS(A,numero,'fechar');assert.equal(o.status,'FECHADA');assert.equal(o.total,170);assert.ok(o.dataFechamento);
 assert.equal(s.historico(A,v.id)[0].numero,numero);assert.equal(s.painel(G).totalFechadas,170);
 assert.equal(s.clientes(A)[0].id,c.id);assert.ok(s.auditoria(G).some(x=>x.operacao==='FECHAR'));
});
test('CT22 - RBAC, acesso de outro mecânico e sessão revogada',t=>{
 const e=ambiente(t),{s,A,M,G,auth}=e,{o}=novaOS(e);
 assert.throws(()=>s.editarOS(A,o.numero,'servicos',{descricao:'a',quantidade:1,valorUnitario:1}),/perfil/);
 assert.throws(()=>s.editarOS(M,o.numero,'cancelar',{justificativa:'a'}),/perfil/);
 assert.throws(()=>s.salvarPeca(A,{codigo:'X'}),/perfil/);assert.throws(()=>s.usuarios(M),/perfil/);assert.throws(()=>s.auditoria(A),/perfil/);assert.throws(()=>s.clientes(M),/perfil/);
 const {id}=s.salvarUsuario(G,{login:'mec2',senha:'teste1234',perfil:'MECANICO'});
 const m2=auth.login('mec2','teste1234');s.editarOS(G,o.numero,'atribuir',{mecanicoId:id});
 assert.throws(()=>s.editarOS(M,o.numero,'diagnostico',{diagnostico:'a'}),/outro mecânico/);
 assert.throws(()=>s.salvarUsuario(G,{perfil:'MECANICO',ativo:false},id),/Reatribua/);
 s.editarOS(G,o.numero,'atribuir',{mecanicoId:M.id});s.salvarUsuario(G,{perfil:'MECANICO',ativo:false},id);
 assert.equal(auth.obterSessao(m2.token),null);assert.throws(()=>auth.login('mec2','teste1234'),/inválidas/);
 assert.throws(()=>s.salvarUsuario(G,{perfil:'ATENDENTE',ativo:true},G.id),/próprio/);
});
test('CT23 - estoque insuficiente e auditoria com falha provocam rollback integral',t=>{
 const e=ambiente(t),{s,M,db}=e,{o}=novaOS(e),before=estoque(e);
 assert.throws(()=>s.editarOS(M,o.numero,'pecas',{codigo:'P001',quantidade:before+1}),/Estoque insuficiente/);
 assert.equal(s.detalhe(M,o.numero).pecas.length,0);assert.equal(estoque(e),before);
 db.exec("CREATE TRIGGER teste_falha BEFORE INSERT ON auditoria WHEN NEW.operacao='ADICIONAR_PECA' BEGIN SELECT RAISE(ABORT,'Falha simulada'); END;");
 assert.throws(()=>s.editarOS(M,o.numero,'pecas',{codigo:'P001',quantidade:1}),/Falha simulada/);
 assert.equal(s.detalhe(M,o.numero).pecas.length,0);assert.equal(estoque(e),before);
 db.exec('DROP TRIGGER teste_falha');s.editarOS(M,o.numero,'pecas',{codigo:'P001',quantidade:1});assert.equal(estoque(e),before-1);
});
test('CT24 - fechar sem serviço, bloquear edição, reabrir e cancelar com justificativa',t=>{
 const e=ambiente(t),{s,A,M,G}=e,{o}=novaOS(e),id=o.numero;
 assert.throws(()=>s.editarOS(A,id,'fechar'),/sem serviço/);s.editarOS(M,id,'servicos',{descricao:'Teste',quantidade:2,valorUnitario:35});s.editarOS(M,id,'pecas',{codigo:'P001',quantidade:1});s.editarOS(M,id,'fechar');
 assert.throws(()=>s.editarOS(M,id,'servicos',{descricao:'Outra',quantidade:1,valorUnitario:1}),/fechada/);
 assert.throws(()=>s.editarOS(G,id,'reabrir',{justificativa:''}),/Justificativa/);
 assert.throws(()=>s.editarOS(G,id,'cancelar',{justificativa:'Teste'}),/fechada/);
 assert.equal(s.editarOS(G,id,'reabrir',{justificativa:'Correção'}).status,'ABERTA');
 assert.throws(()=>s.editarOS(G,id,'cancelar',{justificativa:''}),/Justificativa/);
 const before=estoque(e);assert.equal(s.editarOS(G,id,'cancelar',{justificativa:'Cancelado por solicitação'}).status,'CANCELADA');
 assert.equal(estoque(e),before);assert.equal(s.painel(G).totalFechadas,0);
 assert.throws(()=>s.editarOS(G,id,'reabrir',{justificativa:'Teste'}),/Somente OS fechada/);
 assert.ok(s.auditoria(G).some(x=>x.detalhe==='Cancelado por solicitação'));
});
test('CT25 - devolução de peça e remoção de serviço recalculam total',t=>{
 const e=ambiente(t),{s,M}=e,{o}=novaOS(e),before=estoque(e),id=o.numero;
 s.editarOS(M,id,'servicos',{descricao:'Serviço',quantidade:1,valorUnitario:100});let r=s.editarOS(M,id,'pecas',{codigo:'P001',quantidade:2});
 const itemId=r.pecas[0].id;assert.equal(r.total,170);
 r=s.editarOS(M,id,'removerPeca',{itemId,justificativa:'Peça não utilizada'});assert.equal(r.total,100);assert.equal(estoque(e),before);
 assert.throws(()=>s.editarOS(M,id,'removerPeca',{itemId,justificativa:'Duplicada'}),/não encontrado/);
 r=s.editarOS(M,id,'removerServico',{itemId:r.servicos[0].id,justificativa:'Lançamento incorreto'});assert.equal(r.total,0);assert.throws(()=>s.editarOS(M,id,'fechar'),/sem serviço/);
});
test('CT26 - integridade cadastral, placa única e cliente ativo',t=>{
 const e=ambiente(t),{s,A,G}=e,{c,v,o}=novaOS(e);
 assert.throws(()=>s.salvarVeiculo(A,{clienteId:c.id,placa:'ABC-1D23',marca:'Fiat',modelo:'Toro'}),/UNIQUE/);
 assert.throws(()=>s.ativarCliente(G,c.id,{ativo:false}),/Finalize/);
 s.editarOS(G,o.numero,'cancelar',{justificativa:'Teste'});s.ativarCliente(G,c.id,{ativo:false});
 assert.throws(()=>s.abrir(A,{veiculoId:v.id,relato:'Teste'}),/inativo/);
 assert.throws(()=>s.agendar(A,{veiculoId:v.id,dataHora:'2027-01-05T09:00',motivo:'Teste'}),/inativo/);
 s.ativarCliente(G,c.id,{ativo:true});s.salvarCliente(A,{nome:'Cliente atualizado',telefone:'123'},c.id);
 s.salvarVeiculo(A,{clienteId:c.id,placa:'XYZ1234',marca:'Fiat',modelo:'Toro'},v.id);
 assert.equal(s.veiculos(A)[0].placa,'XYZ1234');assert.equal(s.veiculos(A)[0].clienteNome,'Cliente atualizado');
});
test('CT27 - agenda rejeita conflito, reage a cancelamento e evita OS duplicada',t=>{
 const e=ambiente(t),{s,A}=e,{v}=cadastro(e),a=s.agendar(A,{veiculoId:v.id,dataHora:'2027-01-06T09:00',motivo:'Teste'});
 assert.throws(()=>s.agendar(A,{veiculoId:v.id,dataHora:'2027-01-06T09:00',motivo:'Teste'}),/horário/);
 assert.throws(()=>s.agendar(A,{veiculoId:v.id,dataHora:'2027-02-30T09:00',motivo:'Teste'}),/inválida/);
 s.alterarAgenda(A,a.id,{acao:'REAGENDAR',dataHora:'2027-01-06T10:00',motivo:'Novo horário'});
 const b=s.agendar(A,{veiculoId:v.id,dataHora:'2027-01-06T09:00',motivo:'Teste'});s.alterarAgenda(A,b.id,{acao:'CANCELAR',justificativa:'Cliente solicitou'});
 s.alterarAgenda(A,a.id,{acao:'ABRIR_OS',quilometragem:1});assert.throws(()=>s.alterarAgenda(A,a.id,{acao:'ABRIR_OS'}),/encerrado/);
 assert.equal(s.ordens(A).length,1);
});
test('CT28 - cadastro e movimentação gerencial de peças, preços históricos',t=>{
 const e=ambiente(t),{s,G,M}=e,{o}=novaOS(e);
 s.salvarPeca(G,{codigo:'P004',descricao:'Vela',estoque:3,valorUnitario:20,estoqueMinimo:2});
 s.editarOS(M,o.numero,'pecas',{codigo:'P004',quantidade:1});
 s.salvarPeca(G,{descricao:'Vela',valorUnitario:25,estoqueMinimo:3},'P004');
 assert.equal(s.detalhe(M,o.numero).pecas[0].valorUnitario,20);assert.equal(estoque(e,'P004'),2);
 assert.throws(()=>s.ajustarEstoque(G,'P004',{tipo:'SAIDA',quantidade:3,justificativa:'Teste'}),/insuficiente/);
 s.ajustarEstoque(G,'P004',{tipo:'ENTRADA',quantidade:5,justificativa:'Reposição'});assert.equal(estoque(e,'P004'),7);
 assert.ok(s.auditoria(G).some(x=>x.operacao==='ENTRADA'&&x.identificador==='P004'));
});
test('CT29 - valores inválidos não persistem e senhas não são armazenadas em claro',t=>{
 const e=ambiente(t),{s,M,G,auth,db}=e,{o}=novaOS(e);
 for(const q of ['abc',-1,0,Infinity,null])assert.throws(()=>s.editarOS(M,o.numero,'pecas',{codigo:'P001',quantidade:q}),/inválido/);
 assert.throws(()=>s.editarOS(M,o.numero,'servicos',{descricao:'Teste',quantidade:1,valorUnitario:'NaN'}),/inválido/);
 assert.equal(s.detalhe(M,o.numero).pecas.length,0);assert.equal(s.detalhe(M,o.numero).servicos.length,0);
 assert.ok(db.prepare('SELECT senha_hash FROM usuarios').all().every(x=>x.senha_hash!=='123456'&&x.senha_hash.includes(':')));
 assert.ok(s.usuarios(G).every(x=>!('senha_hash' in x)));assert.throws(()=>auth.login('gerente','errada'),/inválidas/);
 const ss=auth.login('gerente','123456');auth.logout(ss.token);assert.equal(auth.obterSessao(ss.token),null);
});
test('CT30 - migração aditiva de banco V1 e persistência após reinício',t=>{
 const dir=mkdtempSync(join(tmpdir(),'prime-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const file=join(dir,'oficina.db');
 const first=createDatabase(file);createSchema(first);first.exec('ALTER TABLE ordens_servico DROP COLUMN mecanico_id; ALTER TABLE agendamentos DROP COLUMN os_numero; ALTER TABLE pecas DROP COLUMN estoque_minimo;');first.exec("INSERT INTO clientes(nome,telefone) VALUES('Legado','123'); INSERT INTO veiculos(cliente_id,placa,marca,modelo) VALUES(1,'LEG1234','Fiat','Uno'); INSERT INTO ordens_servico(veiculo_id,data_abertura,status,relato) VALUES(1,'2026-01-01','ABERTA','Legado');");first.close();
 const e=ambiente(t,{databaseFile:file});assert.equal(e.s.detalhe(e.A,1).relato,'Legado');assert.equal(e.s.detalhe(e.A,1).mecanicoId,null);assert.equal(e.s.pecas(e.G)[0].estoqueMinimo,5);e.s.editarOS(e.G,1,'atribuir',{mecanicoId:e.M.id});
 const second=createOficina({databaseFile:file});try{const u=second.autenticacaoService.login('gerente','123456').usuario;assert.equal(second.oficina.detalhe(u,1).mecanicoId,e.M.id);assert.equal(second.oficina.clientes(u).length,1);}finally{second.db.close();}
});
