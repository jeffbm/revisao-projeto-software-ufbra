import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createOficina } from "./oficina.js";
import { authMiddleware } from "./middleware/auth.js";
import { authRoutes } from "./routes/authRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js";

export function createApp(options = {}) {
  const { oficina, autenticacaoService, db } = createOficina(options);
  const app = express();
  app.disable("x-powered-by");
  app.use((req,res,next)=>{
    res.setHeader("X-Content-Type-Options","nosniff");
    res.setHeader("X-Frame-Options","DENY");
    res.setHeader("Referrer-Policy","no-referrer");
    res.setHeader("Content-Security-Policy","default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    if(req.path.startsWith('/api')) res.setHeader('Cache-Control','no-store');
    next();
  });
  app.use(express.json({limit:'64kb'}));
  app.get('/health', (_req,res)=>res.json({status:'ok',projeto:'Oficina Prime',versao:'2.0.0'}));
  app.use('/api/auth',authRoutes(autenticacaoService));
  app.use('/api',authMiddleware(autenticacaoService),apiRoutes(oficina));
  app.use('/api',(_req,res)=>res.status(404).json({erro:'Rota não encontrada.'}));
  app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public'),{etag:true}));
  app.use((err,_req,res,_next)=>res.status(err.status===413?413:400).json({erro:err.status===413?'Requisição muito grande.':'Requisição inválida.'}));
  return { app, db, oficina, autenticacaoService };
}
