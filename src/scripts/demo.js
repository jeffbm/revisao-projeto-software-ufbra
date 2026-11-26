/** Massa didática em arquivo separado. Nunca substitui banco existente. */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createOficina } from '../oficina.js';
const file=resolve('./data/oficina-demo.db');
if(existsSync(file)){console.error('O banco de demonstração já existe; nenhum dado foi alterado.');process.exit(1);}
const {oficina:s,autenticacaoService:auth,db}=createOficina({databaseFile:file});
try {
 const a=auth.login('atendente','123456').usuario,m=auth.login('mecanico','123456').usuario,g=auth.login('gerente','123456').usuario;
 const casos=[['Ana Exemplo','OPR1A01','Fiat','Toro','Troca de óleo'],['Carlos Exemplo','OPR1A02','Honda','Fit','Ruído na suspensão'],['Marina Exemplo','OPR1A03','Volkswagen','Polo','Revisão preventiva'],['Paulo Exemplo','OPR1A04','Toyota','Corolla','Verificar freios']];
 for(let i=0;i<casos.length;i++){
  const [nome,placa,marca,modelo,relato]=casos[i],c=s.salvarCliente(a,{nome,telefone:`120000000${i}`,email:`cliente${i}@example.invalid`}),v=s.salvarVeiculo(a,{clienteId:c.id,placa,marca,modelo,ano:2020});
  if(i===3){const d=new Date();d.setDate(d.getDate()+1);const dataHora=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T09:00`;s.agendar(a,{veiculoId:v.id,dataHora,motivo:relato});continue;}
  const o=s.abrir(a,{veiculoId:v.id,quilometragem:34000+i*10000,relato});if(i!==2)s.editarOS(g,o.numero,'atribuir',{mecanicoId:m.id});
  if(i===0){s.editarOS(m,o.numero,'diagnostico',{diagnostico:'Óleo e filtro precisam de substituição.'});s.editarOS(m,o.numero,'servicos',{descricao:'Troca de óleo e filtro',quantidade:1,valorUnitario:100});s.editarOS(m,o.numero,'pecas',{codigo:'P001',quantidade:1});s.editarOS(m,o.numero,'pecas',{codigo:'P002',quantidade:4});s.editarOS(a,o.numero,'fechar');}
  if(i===1)s.editarOS(m,o.numero,'diagnostico',{diagnostico:'Inspecionar buchas e amortecedores.'});
 }
 console.log(`Banco fictício criado: ${file}\nKali: DATABASE_FILE=./data/oficina-demo.db npm start`);
}finally{db.close();}
