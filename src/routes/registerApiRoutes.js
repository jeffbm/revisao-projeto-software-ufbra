/** HTTP traduz para casos de uso; autorização e transações ficam em OficinaService. */
export function registerApiRoutes(router,s) {
  const safe=fn=>(req,res)=>{try {res.json(fn(req.usuario, req.body??{}, req.params));}catch(e){
    if(String(e.message).includes('UNIQUE constraint failed'))return res.status(409).json({erro:'Já existe um registro com esse identificador.'});
    if(e.code?.startsWith('ERR_SQLITE')){console.error(e);return res.status(500).json({erro:'Falha de persistência. Nenhuma alteração foi confirmada nesta operação.'});}
    res.status(e.status||400).json({erro:e.message});
  }};
  const get=(path,fn)=>router.get(path,safe(fn));
  const post=(path,fn)=>router.post(path,safe(fn));
  const put=(path,fn)=>router.put(path,safe(fn));
  get('/me',u=>u);
  get('/painel',u=>s.painel(u));
  get('/clientes',u=>s.clientes(u));
  post('/clientes',(u,b)=>s.salvarCliente(u,b));
  put('/clientes/:id',(u,b,p)=>s.salvarCliente(u,b,p.id));
  post('/clientes/:id/ativo',(u,b,p)=>s.ativarCliente(u,p.id,b));
  get('/veiculos',u=>s.veiculos(u));
  post('/veiculos',(u,b)=>s.salvarVeiculo(u,b));
  put('/veiculos/:id',(u,b,p)=>s.salvarVeiculo(u,b,p.id));
  get('/veiculos/:id/historico',(u,b,p)=>s.historico(u,p.id));
  get('/agenda',u=>s.agenda(u));
  post('/agenda',(u,b)=>s.agendar(u,b));
  post('/agenda/:id/acao',(u,b,p)=>s.alterarAgenda(u,p.id,b));
  get('/os',u=>s.ordens(u));
  get('/os/:numero',(u,b,p)=>s.detalhe(u,p.numero));
  post('/os',(u,b)=>s.abrir(u,b));
  for(const a of ['diagnostico','servicos','pecas','removerServico','removerPeca','fechar','reabrir','cancelar','atribuir'])
    post(`/os/:numero/${a}`,(u,b,p)=>s.editarOS(u,p.numero,a,b));
  get('/pecas',u=>s.pecas(u));
  post('/pecas',(u,b)=>s.salvarPeca(u,b));
  put('/pecas/:codigo',(u,b,p)=>s.salvarPeca(u,b,p.codigo));
  post('/pecas/:codigo/ajuste',(u,b,p)=>s.ajustarEstoque(u,p.codigo,b));
  get('/usuarios',u=>s.usuarios(u));
  post('/usuarios',(u,b)=>s.salvarUsuario(u,b));
  put('/usuarios/:id',(u,b,p)=>s.salvarUsuario(u,b,p.id));
  get('/auditoria',u=>s.auditoria(u));
  return router;
}
