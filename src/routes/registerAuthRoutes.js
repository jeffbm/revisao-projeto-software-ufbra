export function registerAuthRoutes(router,authService) {
  const tentativas = new Map();
  router.post('/login',(req,res)=>{
    const login=typeof req.body?.login==='string'?req.body.login.trim().toLowerCase().slice(0,40):'';
    const key=`${req.ip}|${login}`,now=Date.now();
    if(tentativas.size>5000)for(const [k,v] of tentativas)if(v.ate<=now)tentativas.delete(k);
    const a=tentativas.get(key);
    if(a&&a.ate>now&&a.n>=12)return res.status(429).json({erro:'Muitas tentativas. Tente novamente em alguns minutos.'});
    try {const sessao=authService.login(login,req.body?.senha);tentativas.delete(key);res.json(sessao);}
    catch {tentativas.set(key,a&&a.ate>now?{...a,n:a.n+1}:{n:1,ate:now+5*60000});res.status(401).json({erro:'Credenciais inválidas.'});}
  });
  router.post('/logout',(req,res)=>{const h=req.headers.authorization||'';if(h.startsWith('Bearer '))authService.logout(h.slice(7));res.status(204).end();});
  return router;
}
