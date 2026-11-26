# Oficina Prime 2.0 — Implementação didática

Aplicação de referência da UFBRA. Node.js >= 22.5 (recomendado Node 24 LTS no ambiente de aula), Express 5, SQLite nativo (`node:sqlite`) e frontend sem dependências externas.

## Executar

A partir deste diretório (`src`):

```bash
npm install
npm test
npm start
```

Windows PowerShell: use `npm.cmd` caso a política de scripts bloqueie `npm.ps1`.

Acesso padrão: `http://localhost:3000`; `GET /health` verifica a versão. `HOST` (padrão `0.0.0.0`), `PORT` (3000) e `DATABASE_FILE` (`./data/oficina-prime.db`) são configuráveis. Para teste apenas local: `HOST=127.0.0.1 npm start`.

Credenciais iniciais: `atendente`, `mecanico`, `gerente`, senha `123456` em banco novo. Altere antes de uso compartilhado. Dados fictícios e rede autorizada somente.

## Estrutura e responsabilidades

| Arquivo/diretório | Responsabilidade |
|---|---|
| `server.js` | Inicialização HTTP e encerramento |
| `app.js` | Express, rotas e estáticos |
| `oficina.js` | Composition root, serviços e banco |
| `public/` | Interface responsiva, filtros, formulários, impressão |
| `routes/` | Contrato HTTP e respostas JSON |
| `middleware/auth.js` | Autenticação Bearer |
| `services/OficinaService.js` | Orquestração, validação, RBAC e transações |
| `services/OSService.js`, `EstoqueService.js` etc. | Casos de uso e regras coordenadas |
| `domain/` | Entidades e regras de negócio |
| `repositories/` | Consultas e persistência parametrizada |
| `database/` | Schema, migração e seed inicial |
| `scripts/` | Backup e base de demonstração separada |
| `tests/` | 7 testes originais, 10 de integração e 1 HTTP |

`npm run demo` cria `data/oficina-demo.db` sem substituir arquivos existentes. Para usá-lo, configure `DATABASE_FILE`. `npm run backup` cria uma cópia verificada do banco atual. Nunca execute com `sudo` desnecessariamente.

Consulte `../README-ATUALIZACAO-V2.md` e a documentação em `../doc`. Não confundir a aplicação acadêmica com um produto financeiro/operacional pronto para produção.
