# 05 — Matriz de Rastreabilidade

A rastreabilidade liga aquilo que foi solicitado ao que será projetado e testado.

| Requisito | Caso de uso | Classes/Serviços | Testes principais |
|---|---|---|---|
| RF01 Autenticar | UC01 | Usuario, AutenticacaoService | CT01, CT16 |
| RF02 Cliente | UC02 | Cliente, ClienteService | CT02, CT10 |
| RF03 Veículo | UC03 | Veiculo, VeiculoService | CT03, CT11 |
| RF04 Agendar | UC04 | Agendamento, AgendaService | CT04, CT12 |
| RF05 Abrir OS | UC05 | OrdemServico, OSService | CT05, CT13 |
| RF06 Diagnóstico | UC06 | OrdemServico, OSService | CT06 |
| RF07 Serviço | UC07 | ItemServico, OrdemServico | CT07 |
| RF08 Peça | UC08 | Peca, PecaUtilizada, EstoqueService | CT08, CT14 |
| RF09 Fechar OS | UC09 | OrdemServico, OSService | CT09, CT15 |
| RF10 Histórico | UC10 | Veiculo, OSRepository | CT17 |
| RF12 Auditoria | vários | Auditoria, AuditoriaService | CT18 |
| RF13 Reabrir | UC11 | OrdemServico, Usuario | CT19 |
| RNF03 Desempenho | vários | arquitetura | CT20 |
| RNF01/RNF02 Segurança | UC01/UC11 | Usuario, Auth | CT16, CT19 |
| RNF08 Consistência | UC08/UC09 | OSService, EstoqueService | CT14, CT15 |

## Regra

Nenhum requisito crítico deve ficar sem:

1. caso de uso ou decisão de arquitetura;
2. componente responsável;
3. pelo menos um teste associado.

## Matriz complementar V2 — código e evidências

| Requisito | Caso de uso | Componente principal | Verificação |
|---|---|---|---|
| RF01/RNF01/RNF09 | UC01 | AutenticacaoService, auth | CT29, CT31 |
| RF02/RF03/RF17 | UC02/03/15 | OficinaService, Cliente/VeiculoService | CT26 |
| RF04/RF11/RF18 | UC04/16 | OficinaService, AgendaService, GestaoRepository | CT21, CT27 |
| RF05–RF10 | UC05–UC10 | OSService, EstoqueService, OficinaService | CT21, CT23, CT24, CT25 |
| RF12/RF23 | UC21 | AuditoriaService/GestaoRepository | CT21, CT23, CT28, CT31 |
| RF13/RF14 | UC11/12 | OficinaService/OSService | CT22, CT24 |
| RF15/RF16 | UC13/14 | GestaoRepository, OficinaService, public/app.js | CT21, CT22, AT04/05 |
| RF19 | UC17 | OficinaService/GestaoRepository | CT28, AT13 |
| RF20 | UC18 | OficinaService | CT25 |
| RF21/RNF02 | UC19 | OficinaService/AutenticacaoService | CT22, CT29 |
| RF22 | UC20 | OficinaService.painel, public/app.js | CT21, CT24, AT15 |
| RF24 | UC13 | public/app.js / CSS de impressão | AT12 |
| RF25/RNF04 | UC22 | scripts/backup.js, scripts/demo.js | teste local scripts, AT18 (rotina diária pendente) |
| RNF07/08/10 | UC05/08/18 | SQLite, OficinaService | CT23, CT26, CT30 |
| RNF03/RNF06 | Vários | Interface/servidor/rede | AT19/20 e aceite em aula, pendentes |

CT31 é integração HTTP prevista; só será aprovado após execução com Express instalado. CT20/RNF03 permanece pendente. A lista original de casos é o planejamento; não significa que todos os CT01–CT20 tenham sido executados individualmente.
