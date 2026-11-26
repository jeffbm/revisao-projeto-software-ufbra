# Mapeamento Requisitos → Código

| Requisito | Implementação principal |
|---|---|
| RF01 Autenticar | `services/AutenticacaoService.js`, `routes/authRoutes.js` |
| RF02 Cliente | `ClienteService`, `ClienteRepository` |
| RF03 Veículo | `VeiculoService`, `VeiculoRepository` |
| RF04 Agendar | `AgendaService`, `AgendamentoRepository` |
| RF05 Abrir OS | `OSService.abrir()` |
| RF06 Diagnóstico | `OSService.registrarDiagnostico()` |
| RF07 Serviço | `OSService.adicionarServico()` |
| RF08 Peça | `EstoqueService.registrarPecaNaOS()` |
| RF09 Fechar OS | `OSService.fechar()` |
| RF10 Histórico | `OficinaService.historico()` / `GestaoRepository.ordens()` |
| RF11 Agenda | `OficinaService.agenda()` / `GestaoRepository.agenda()` |
| RF12 Auditoria | `AuditoriaService` |
| RF13 Reabrir OS | `OSService.reabrir()` |
| RF14 Cancelar OS | `OSService.cancelar()` |

## Exemplos de rastreabilidade

### RN05 — saldo de peça não pode ficar negativo

- regra: `domain/Peca.js`
- caso de uso: `services/EstoqueService.js`
- teste: `tests/Peca.test.js`

### RN06 — fechamento exige serviço

- regra: `domain/OrdemServico.js`
- caso de uso: `services/OSService.js`
- teste: `tests/OrdemServico.test.js`

### RN07 — somente gerente pode reabrir/cancelar

- autorização: `services/OSService.js`
- teste: `tests/Autorizacao.test.js`

## V2

RF15–RF25 estão mapeados em `../../doc/05-rastreabilidade.md`. A entrada de todas as mutações protegidas é `OficinaService`; `registerApiRoutes.js` expõe o contrato HTTP. `Oficina.integration.test.js` verifica regras e persistência de forma integrada.
