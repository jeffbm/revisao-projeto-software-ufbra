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
