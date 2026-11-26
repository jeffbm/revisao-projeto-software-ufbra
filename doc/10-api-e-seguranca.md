# 10 — Contrato HTTP, segurança e implantação

Base `/api`; JSON UTF-8. Rotas protegidas exigem `Authorization: Bearer <token>`. `GET /health` é público e não expõe dados. O login retorna `{token, expiraEm, usuario:{id,login,perfil}}`. A sessão é mantida em memória por até 8 horas; logout, alteração de conta e reinício invalidam o token. As rotas usam `registerApiRoutes.js` e `registerAuthRoutes.js` conectadas ao Router do Express. Operações autorizadas retornam HTTP 200 com JSON, logout 204; 400 para validação, 401 para autenticação, 403 para perfil, 404 para registro/rota ausente, 409 para unicidade, 429 para limite simples de tentativas. A interface trata erros e escapa conteúdos dinâmicos.

A=Atendente, M=Mecânico, G=Gerente. M* = sujeito a atribuição; todas as alterações de OS exigem estado adequado.

| Método e rota (após `/api`) | Perfis | Entrada principal |
|---|---|---|
| POST `/auth/login` | Público | login, senha |
| POST `/auth/logout` | Token opcional | cabeçalho Bearer |
| GET `/me`, `/painel` | A/M/G | — |
| GET `/clientes` | A/G | — |
| POST `/clientes`, PUT `/clientes/:id` | A/G | nome, telefone, email |
| POST `/clientes/:id/ativo` | G | ativo (booleano) |
| GET `/veiculos` | A/M/G | — |
| POST `/veiculos`, PUT `/veiculos/:id` | A/G | clienteId, placa, marca, modelo, ano, observacao |
| GET `/veiculos/:id/historico` | A/M/G | — |
| GET `/agenda` | A/M/G | — |
| POST `/agenda` | A/G | veiculoId, dataHora (YYYY-MM-DDTHH:mm local), motivo |
| POST `/agenda/:id/acao` | A/G | acao: REAGENDAR (dataHora, motivo), CANCELAR (justificativa), ABRIR_OS (quilometragem, relato) |
| GET `/os`, `/os/:numero` | A/M/G | — |
| POST `/os` | A/G | veiculoId, quilometragem, relato |
| POST `/os/:numero/diagnostico` | M*/G | diagnostico |
| POST `/os/:numero/servicos` | M*/G | descricao, quantidade, valorUnitario |
| POST `/os/:numero/pecas` | M*/G | codigo, quantidade |
| POST `/os/:numero/removerServico`, `/os/:numero/removerPeca` | M*/G | itemId, justificativa |
| POST `/os/:numero/fechar` | A/M*/G | objeto vazio |
| POST `/os/:numero/atribuir` | G | mecanicoId ou null/vazio |
| POST `/os/:numero/reabrir`, `/os/:numero/cancelar` | G | justificativa |
| GET `/pecas` | A/M/G | — |
| POST `/pecas` | G | codigo, descricao, estoque, estoqueMinimo, valorUnitario |
| PUT `/pecas/:codigo` | G | descricao, estoqueMinimo, valorUnitario |
| POST `/pecas/:codigo/ajuste` | G | tipo ENTRADA/SAIDA, quantidade, justificativa |
| GET `/usuarios` | G | — |
| POST `/usuarios` | G | login, senha, perfil |
| PUT `/usuarios/:id` | G | perfil, ativo, senha opcional |
| GET `/auditoria` | G | — (500 eventos mais recentes) |

Relatórios e filtros são preparados pela interface sobre os registros autorizados, não por SQL fornecido pelo usuário. A exportação CSV protege campos iniciados com caracteres de fórmulas comuns. Para volumes grandes, a evolução deve incluir paginação e filtros no backend.

## Segurança implementada e limites

- Autenticação com hash scrypt e salt individual; comparação em tempo constante. Senhas de demonstração são conhecidas, devem ser alteradas antes de uso compartilhado. Sessões Bearer não são equivalentes a um provedor de identidade de produção.
- RBAC centralizado em `OficinaService` com verificação de atribuição por mecânico. O backend valida campos, números finitos, status e identidade das entidades; SQL parametrizado; FKs habilitadas.
- Transações `BEGIN IMMEDIATE` para mutações da aplicação; baixa de peças usa savepoint e auditoria na mesma operação. Falha de persistência desfaz o conjunto. Uma instância de servidor é o cenário suportado.
- Cabeçalhos CSP (apenas recursos locais), frame deny e nosniff; limite de JSON 64 KiB; limite simples de tentativas de login por IP/login (não substitui proteção contra abuso em produção).
- Não use senha real/pessoal, não exponha HTTP à Internet. Bridge dá IP da rede local, mas isolamento Wi-Fi/VLAN pode impedir conexões. Restrinja a porta 3000 à sub-rede de aula e obtenha autorização do responsável pela rede. O padrão `HOST=0.0.0.0` aceita conexões nas interfaces IPv4. Para demonstração privada, `HOST=127.0.0.1`.
- Não há TLS, MFA, política robusta de senhas, isolamento por empresa, SIEM, armazenamento central de sessão ou alta disponibilidade. Backup diário automatizado e restauração periódica são responsabilidades operacionais pendentes.

## Dados e migração

`createSchema` cria tabelas ausentes e adiciona apenas `ordens_servico.mecanico_id`, `agendamentos.os_numero` e `pecas.estoque_minimo` quando ausentes. Não elimina dados. `seed` cria usuários/peças somente se a tabela correspondente estiver vazia. Registros antigos não ganham atribuição automática. O backup é executado pelo script `scripts/backup.js`, com `VACUUM INTO` e `PRAGMA integrity_check`.
