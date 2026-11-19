# Casos de Teste

## Convenção

- **P** — Passou
- **F** — Falhou
- **B** — Bloqueado

| ID | Tipo | Requisito | Cenário | Resultado esperado |
|---|---|---|---|---|
| CT01 | Unitário | RF01 | credencial inválida | autenticação rejeitada |
| CT02 | Unitário | RF02 | cliente sem nome | validação rejeita |
| CT03 | Integração | RF03 | salvar veículo com cliente válido | veículo persistido com vínculo correto |
| CT04 | Unitário | RF04 | data/hora inválida | agendamento rejeitado |
| CT05 | Unitário | RF05 | abrir OS com dados válidos | objeto OS recebe estado ABERTA |
| CT06 | Sistema | RF06 | registrar diagnóstico | diagnóstico fica disponível na OS |
| CT07 | Unitário | RF07 | calcular subtotal do serviço | quantidade × valor correto |
| CT08 | Unitário | RF08 | baixar quantidade maior que saldo | operação rejeitada |
| CT09 | Unitário | RF09/RN06 | fechar OS sem serviço | fechamento rejeitado |
| CT10 | Sistema | RF02 | cadastrar e consultar cliente | dados retornam corretamente |
| CT11 | Sistema | RF03 | cadastrar veículo | veículo aparece vinculado ao cliente |
| CT12 | Sistema | RF04 | criar e consultar agendamento | agendamento aparece no período |
| CT13 | Integração | RF05 | abrir OS e recuperar do banco | OS retornada com mesmo número/dados |
| CT14 | Integração | RF08/RN04 | adicionar peça | vínculo criado e estoque reduzido |
| CT15 | Integração | RF09/RNF08 | falha durante fechamento | operação não deixa dados parciais |
| CT16 | Segurança | RNF01/RNF02 | usuário comum tenta ação de gerente | acesso negado |
| CT17 | Sistema | RF10 | consultar histórico por veículo | somente OS do veículo são exibidas |
| CT18 | Sistema | RF12 | fechar OS | auditoria registra usuário/data/operação |
| CT19 | Segurança/Aceitação | RF13 | reabrir OS como não gerente | operação negada |
| CT20 | Desempenho | RNF03 | abrir telas principais | resposta <= 2 s em condição normal |

---

# Casos detalhados

## CT09 — Fechar OS sem serviço

**Objetivo:** validar RN06.

**Pré-condição:**
- OS `ABERTA`;
- nenhum `ItemServico`.

**Passos:**
1. selecionar a OS;
2. solicitar fechamento.

**Esperado:**
- fechamento rejeitado;
- mensagem clara;
- status permanece `ABERTA`;
- nenhum dado inconsistente é gravado.

---

## CT14 — Registrar peça e atualizar estoque

**Pré-condições:**
- OS válida;
- peça P001 com estoque 10.

**Entrada:**
- quantidade = 3.

**Esperado:**
- `PecaUtilizada` criada;
- estoque final = 7;
- auditoria registrada;
- ambas as alterações confirmadas de forma consistente.

---

## CT15 — Falha transacional no fechamento

**Objetivo:** provar consistência.

**Cenário:**
uma falha é simulada durante a persistência.

**Esperado:**
- não existir fechamento parcial;
- banco volta ao estado anterior;
- usuário recebe erro;
- evento técnico pode ser registrado em log.

---

## CT20 — Tempo de resposta

**Cenário:**
consulta de agenda, cliente e OS em massa representativa do MVP.

**Esperado:**
tempo <= 2 s nas telas principais, em condições normais definidas no ambiente de teste.
