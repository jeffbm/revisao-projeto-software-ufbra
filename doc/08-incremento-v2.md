# 08 — Especificação do incremento funcional 2.0

**Objetivo:** transformar a implementação mínima em uma aplicação de oficina navegável e demonstrável por todos os atores. Os identificadores RF01–RF14 e RN01–RN12 da V1 permanecem válidos. Novos requisitos e critérios abaixo estendem o escopo.

## Requisitos adicionais

| ID | Requisito | Critério verificável |
|---|---|---|
| RF15 | Consultar lista e detalhe de OS | Filtrar por número, placa, cliente, responsável e status; consultar itens e valores |
| RF16 | Atribuir mecânico | Gerente seleciona mecânico ativo ou remove atribuição; mudança auditada |
| RF17 | Editar cadastro e situação de cliente | Atendente/gerente editam; gerente ativa/inativa; OS em andamento impede inativação |
| RF18 | Operar agenda | Atendente/gerente reagendam, cancelam com motivo e convertem uma única vez em OS |
| RF19 | Administrar catálogo e estoque | Gerente cadastra código, preço, mínimo, registra entradas e saídas justificadas; rejeita saldo negativo |
| RF20 | Corrigir lançamentos de OS | Mecânico autorizado/gerente removem serviço ou devolvem peça com motivo; total recalculado e estoque recomposto quando devolvida |
| RF21 | Administrar usuários | Gerente cria conta individual, altera perfil/estado e redefine senha; não visualiza hash; revoga sessões |
| RF22 | Painel e relatório gerencial | Contagem de estados, estoque baixo, valor de OS fechadas, período, ticket médio, CSV e impressão |
| RF23 | Consultar auditoria | Gerente pesquisa eventos recentes por usuário/entidade/operação/identificador/detalhe |
| RF24 | Imprimir resumo da OS | Navegador imprime resumo de atendimento, diagnóstico, itens e total |
| RF25 | Backup operacional e demonstração | Comando gera cópia íntegra; base demo independente não sobrescreve registros |

## Regras adicionais e decisões explícitas de projeto

| ID | Regra |
|---|---|
| RN13 | Mecânico pode consultar todas as OS; só edita as em andamento que estejam sem responsável ou atribuídas a ele. Gerente pode editar todas as em andamento. |
| RN14 | Cancelar OS exige gerente, justificativa e estado em andamento; OS fechada precisa ser reaberta primeiro. Cancelada é terminal. |
| RN15 | Cancelamento mantém itens e consumo real para histórico; não repõe automaticamente peças. Devolução física antes do cancelamento recompõe saldo por operação auditada. |
| RN16 | Preço da peça no lançamento é preservado mesmo após alteração do catálogo. |
| RN17 | Agenda usa horários locais em resolução de minutos; uma única reserva ativa por horário exato. Converter gera OS e agenda concluída na mesma transação. |
| RN18 | Atendente/gerente podem abrir e fechar OS; mecânico autorizado também pode fechar. Fechamento continua exigindo serviço. |
| RN19 | Total exibido inclui serviços e peças em todos os estados. Somente OS atualmente fechadas entram em total gerencial. Esse valor não é pagamento. |
| RN20 | Gerente não pode inativar ou rebaixar sua própria conta; mecânico com OS em andamento deve ser reatribuído antes de inativação ou troca de papel. |
| RN21 | Novas contas ou redefinições exigem senha de pelo menos 8 caracteres. Contas de demonstração antigas preservadas até alteração. |
| RN22 | Placa de veículo normalizada e única em formato brasileiro antigo ou Mercosul; proprietário não é trocado nesta versão. |
| RN23 | Cliente inativo bloqueia abertura/reabertura de OS, agendamento e novos veículos; é preciso encerrar OS em andamento antes de inativar. |
| RN24 | Retirada de peça com devolução, atualização do total e auditoria são atômicas. Justificativa obrigatória para retirada de serviços/peças. |

## Mapa dos módulos por perfil

| Módulo | Atendente | Mecânico | Gerente |
|---|---|---|---|
| Painel / consulta de OS | Sim | Sim | Sim |
| Clientes | Criar/editar/consultar | Sem acesso direto | Criar/editar/ativar/inativar |
| Veículos | Criar/editar/consultar | Consultar | Criar/editar/consultar |
| Agenda | Operar | Consultar | Operar |
| Abrir OS | Sim | Não | Sim |
| Diagnóstico, serviços, peças, devolução | Não | Conforme RN13 | Sim |
| Fechar | Sim | Conforme RN13 | Sim |
| Atribuição, reabertura, cancelamento | Não | Não | Sim |
| Estoque | Consultar | Consultar | Consultar e administrar |
| Histórico / impressão | Sim | Sim | Sim |
| Relatório, usuários, auditoria | Não | Não | Sim |

A regra é aplicada no backend, não somente pela ausência de botões. Todos os perfis podem consultar placa, proprietário e detalhes técnicos de OS; o mecânico não acessa o endpoint completo de clientes. A autorização por oficina/filial não existe (uma oficina única).

## Entrega incremental

- V1: documentação, entidades, serviços, API e tela simples.
- V2: interface por perfil, operações administrativas, refinamento de segurança, integridade e testes de regressão.
- Próximos incrementos (fora da V2): orçamento/aprovação comercial, faturamento/pagamento, fiscal, controle de compras, multiempresa, HTTPS/infraestrutura segura, paginação de grandes conjuntos, avaliação de carga e acessibilidade formal.
