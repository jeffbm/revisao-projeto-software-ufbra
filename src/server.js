import { createApp } from './app.js';
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const { app, db } = createApp({databaseFile:process.env.DATABASE_FILE || './data/oficina-prime.db'});
const server = app.listen(PORT, HOST, () => console.log(`Oficina Prime 2.0: http://localhost:${PORT} (escuta ${HOST})`));
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>{db.close();process.exit(0);}));
