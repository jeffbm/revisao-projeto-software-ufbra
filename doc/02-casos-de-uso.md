# 02 — Casos de Uso

## 1. Atores

| Ator | Responsabilidade |
|---|---|
| Atendente | cadastros, agenda, abertura e consulta de OS |
| Mecânico | diagnóstico, serviços e peças |
| Gerente | operações administrativas, reabertura/cancelamento e acompanhamento |
| Cliente | parte interessada; recebe informações do atendimento |

---

## 2. Catálogo

| ID | Caso de uso | Ator principal |
|---|---|---|
| UC01 | Autenticar-se | Atendente/Mecânico/Gerente |
| UC02 | Cadastrar cliente | Atendente |
| UC03 | Cadastrar veículo | Atendente |
| UC04 | Agendar atendimento | Atendente |
| UC05 | Abrir OS | Atendente |
| UC06 | Registrar diagnóstico | Mecânico |
| UC07 | Adicionar serviço | Mecânico |
| UC08 | Registrar peça utilizada | Mecânico |
| UC09 | Fechar OS | Atendente/Gerente |
| UC10 | Consultar histórico | Atendente/Gerente |
| UC11 | Reabrir OS | Gerente |
| UC12 | Cancelar OS | Gerente |

---

# UC05 — Abrir Ordem de Serviço

## Objetivo
Criar uma OS vinculada a um veículo para iniciar formalmente o atendimento.

## Atores
Atendente.

## Pré-condições
- usuário autenticado;
- cliente cadastrado;
- veículo cadastrado.

## Fluxo principal
1. O atendente pesquisa o cliente.
2. O sistema apresenta os veículos vinculados.
3. O atendente seleciona o veículo.
4. Informa quilometragem e relato inicial.
5. Solicita abertura.
6. O sistema valida os dados.
7. O sistema gera número único.
8. O sistema grava a OS com status `ABERTA`.
9. O sistema registra usuário, data e hora.
10. O sistema apresenta confirmação e número da OS.

## Fluxos alternativos
- **A1 — veículo não cadastrado:** executar UC03 antes de continuar.
- **A2 — campos obrigatórios ausentes:** informar erro e não gravar.
- **A3 — OS já aberta para o veículo:** alertar e solicitar confirmação conforme política definida.

## Pós-condições
- OS persistida;
- disponível para diagnóstico;
- registro de auditoria criado.

## Critério de aceitação
Uma OS válida deve ser consultável imediatamente após a abertura e possuir número único.

---

# UC04 — Agendar Atendimento

## Pré-condições
- usuário autenticado;
- veículo cadastrado.

## Fluxo principal
1. Atendente seleciona cliente e veículo.
2. Informa data/hora e motivo.
3. Sistema verifica os dados obrigatórios.
4. Sistema verifica conflito conforme regra adotada.
5. Sistema grava o agendamento.
6. Sistema apresenta confirmação.

## Exceções
- veículo inexistente;
- data/hora inválida;
- conflito de agenda.

---

# UC08 — Registrar Peça Utilizada

## Pré-condições
- OS existente e não fechada;
- peça cadastrada.

## Fluxo principal
1. Mecânico seleciona a OS.
2. Seleciona a peça.
3. Informa quantidade.
4. Sistema consulta saldo.
5. Sistema valida disponibilidade.
6. Sistema adiciona a peça à OS.
7. Sistema reduz o estoque.
8. Sistema registra auditoria.

## Exceções
- saldo insuficiente → operação rejeitada;
- OS fechada → operação rejeitada.

---

# UC09 — Fechar Ordem de Serviço

## Pré-condições
- usuário autenticado;
- OS aberta;
- pelo menos um serviço registrado.

## Fluxo principal
1. Usuário seleciona a OS.
2. Solicita fechamento.
3. Sistema valida o estado da OS.
4. Valida serviços e peças.
5. Calcula total.
6. Registra usuário e data/hora.
7. Altera status para `FECHADA`.
8. Persiste a operação.
9. Exibe resumo.

## Exceções
- sem serviço → não fechar;
- inconsistência de estoque → não fechar;
- falha de persistência → desfazer a operação lógica.

## Pós-condição
OS fechada e consistente.

---

# UC10 — Consultar Histórico

1. Usuário pesquisa placa/veículo.
2. Sistema localiza o veículo.
3. Sistema recupera as OS relacionadas.
4. Exibe data, serviços, peças, total e status.

---

# UC11 — Reabrir OS

## Ator
Gerente.

## Regras
- somente gerente;
- justificativa obrigatória;
- registrar auditoria;
- alteração deve ficar rastreável.

---

## 3. Relações principais entre casos de uso

- `Abrir OS` depende de `Cadastrar Veículo`.
- `Registrar Peça` depende de OS válida.
- `Fechar OS` depende de serviços registrados.
- `Reabrir OS` especializa uma operação administrativa e exige autorização.
