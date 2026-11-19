# 01 — Especificação de Requisitos

## 1. Convenções

- **RF** — Requisito Funcional: o que o sistema deve fazer.
- **RNF** — Requisito Não Funcional: característica de qualidade ou restrição.
- **RN** — Regra de Negócio: condição própria do domínio da oficina.

---

## 2. Requisitos funcionais

| ID | Requisito | Prioridade | Critério resumido |
|---|---|---:|---|
| RF01 | Autenticar usuário | Alta | acesso permitido somente com credenciais válidas |
| RF02 | Cadastrar cliente | Alta | registrar e consultar dados do cliente |
| RF03 | Cadastrar veículo | Alta | veículo vinculado a um cliente |
| RF04 | Agendar atendimento | Alta | registrar data, horário, veículo e motivo |
| RF05 | Abrir ordem de serviço | Alta | gerar número único e status `ABERTA` |
| RF06 | Registrar diagnóstico | Alta | mecânico registra diagnóstico da OS |
| RF07 | Registrar serviço executado | Alta | serviço vinculado à OS com quantidade/valor |
| RF08 | Registrar peça utilizada | Alta | peça vinculada à OS e estoque atualizado |
| RF09 | Fechar ordem de serviço | Alta | validar regras, calcular total e mudar status |
| RF10 | Consultar histórico do veículo | Média | exibir OS anteriores por veículo |
| RF11 | Consultar agenda | Média | visualizar atendimentos por período |
| RF12 | Registrar auditoria | Alta | registrar usuário, data/hora e operação relevante |
| RF13 | Reabrir OS fechada | Baixa | somente gerente, com justificativa registrada |
| RF14 | Cancelar OS | Baixa | somente gerente quando aplicável |

---

## 3. Requisitos não funcionais

| ID | Requisito | Categoria | Critério |
|---|---|---|---|
| RNF01 | Autenticação individual | Segurança | nenhum usuário opera sem login |
| RNF02 | Autorização por perfil | Segurança | ações administrativas exigem perfil gerente |
| RNF03 | Resposta das telas principais | Desempenho | até 2 s em condições normais |
| RNF04 | Backup diário | Confiabilidade | cópia diária verificável |
| RNF05 | Auditoria | Rastreabilidade | usuário + data/hora + operação |
| RNF06 | Interface simples | Usabilidade | tarefas principais executáveis sem treinamento extenso |
| RNF07 | Integridade de dados | Qualidade | chaves, vínculos e transações não podem gerar registros órfãos |
| RNF08 | Recuperação de erro | Confiabilidade | falhas não devem deixar OS/estoque em estado inconsistente |
| RNF09 | Senhas protegidas | Segurança | senha nunca armazenada em texto puro |
| RNF10 | Manutenibilidade | Qualidade | separação entre interface, regras e persistência |

---

## 4. Regras de negócio

| ID | Regra |
|---|---|
| RN01 | Uma OS só pode ser aberta para veículo cadastrado. |
| RN02 | Cada OS deve possuir número único. |
| RN03 | Uma OS fechada não pode receber novos itens sem reabertura autorizada. |
| RN04 | Peça utilizada deve reduzir o estoque na mesma operação lógica. |
| RN05 | Não é permitido saldo negativo de peça. |
| RN06 | O fechamento exige pelo menos um serviço executado. |
| RN07 | Apenas gerente pode reabrir ou cancelar OS fechada. |
| RN08 | A reabertura exige justificativa. |
| RN09 | Toda alteração relevante deve registrar usuário e data/hora. |
| RN10 | O veículo pertence a um cliente ativo. |
| RN11 | Um agendamento deve possuir data/hora, veículo e motivo. |
| RN12 | O total da OS é a soma dos serviços e peças válidos. |

---

## 5. Requisitos de dados

O sistema deverá manter, no mínimo:

- cliente;
- veículo;
- usuário;
- agendamento;
- ordem de serviço;
- item de serviço;
- peça;
- peça utilizada;
- registro de auditoria.

---

## 6. Critérios gerais de aceitação

1. Não pode existir OS sem veículo.
2. Não pode existir veículo sem cliente.
3. O número da OS deve ser único.
4. Fechar OS sem serviço deve falhar.
5. Peça sem estoque suficiente não pode ser consumida.
6. Operação de fechamento deve preservar consistência entre OS e estoque.
7. Usuário sem permissão não executa ação administrativa.
8. Histórico deve refletir as OS do veículo consultado.
