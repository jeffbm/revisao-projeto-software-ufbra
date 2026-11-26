import { DatabaseSync } from 'node:sqlite';
import { existsSync,mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const source=resolve(process.env.DATABASE_FILE||'./data/oficina-prime.db');
if(!existsSync(source)){console.error('Banco não encontrado:',source);process.exit(1);}
const dest=resolve(process.argv[2]||`./data/backups/oficina-${new Date().toISOString().replace(/[:.]/g,'-')}.db`);
if(existsSync(dest)){console.error('O destino já existe; não será sobrescrito.');process.exit(1);}
mkdirSync(dirname(dest),{recursive:true});
const db=new DatabaseSync(source);try{db.exec('PRAGMA busy_timeout=5000');db.prepare('VACUUM INTO ?').run(dest);}finally{db.close();}
const copy=new DatabaseSync(dest,{readOnly:true});try{const check=copy.prepare('PRAGMA integrity_check').get();if(check.integrity_check!=='ok')throw new Error('Falha na verificação do backup');console.log('Backup SQLite íntegro:',dest);}finally{copy.close();}
