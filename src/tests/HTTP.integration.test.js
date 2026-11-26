import test from 'node:test';
import assert from 'node:assert/strict';
let createApp;
try { ({createApp}=await import('../app.js')); }
catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND'||!e.message.includes("package 'express'"))throw e;}

test('CT31 - HTTP: página, login, autenticação, autorização e fluxo OS', {skip:!createApp?'Express não instalado; execute npm install e repita.':false}, async t=>{
 const {app,db}=createApp({databaseFile:':memory:'});const server=app.listen(0,'127.0.0.1');await new Promise((resolve,reject)=>{server.once('listening',resolve);server.once('error',reject);});t.after(async()=>{await new Promise(r=>server.close(r));db.close();});
 const base=`http://127.0.0.1:${server.address().port}`;
 async function req(path,method='GET',body,token){const r=await fetch(base+path,{method,headers:{...(token?{Authorization:`Bearer ${token}`} :{}),...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});const text=await r.text();return {status:r.status,headers:r.headers,body:text&&r.headers.get('content-type')?.includes('application/json')?JSON.parse(text):text};}
 assert.match((await req('/')).body,/OFICINA/);assert.equal((await req('/health')).body.versao,'2.0.0');assert.equal((await req('/api/os')).status,401);
 const login=async name=>(await req('/api/auth/login','POST',{login:name,senha:'123456'})).body.token;
 const a=await login('atendente'),m=await login('mecanico'),g=await login('gerente');assert.ok(a&&m&&g);
 const c=(await req('/api/clientes','POST',{nome:'Cliente HTTP',telefone:'123'},a)).body;
 const v=(await req('/api/veiculos','POST',{clienteId:c.id,placa:'ABC1234',marca:'Fiat',modelo:'Uno'},a)).body;
 const o=(await req('/api/os','POST',{veiculoId:v.id,relato:'Revisão',quilometragem:0},a)).body;assert.ok(o.numero);
 assert.equal((await req(`/api/os/${o.numero}/cancelar`,'POST',{justificativa:'Teste'},m)).status,403);
 assert.equal((await req(`/api/os/${o.numero}/servicos`,'POST',{descricao:'Revisão',quantidade:1,valorUnitario:100},m)).status,200);
 const closed=await req(`/api/os/${o.numero}/fechar`,'POST',{},a);assert.equal(closed.body.status,'FECHADA');assert.equal(closed.body.total,100);
 assert.equal((await req('/api/auditoria','GET',undefined,m)).status,403);assert.equal((await req('/api/auditoria','GET',undefined,g)).status,200);
 assert.equal((await req('/api/auth/logout','POST',undefined,a)).status,204);assert.equal((await req('/api/me','GET',undefined,a)).status,401);
});
