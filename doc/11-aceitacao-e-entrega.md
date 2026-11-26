# 11 — Roteiro de aceitação, entrega e encerramento do curso

## Plano de 100 minutos

| Tempo | Demonstração | Evidência a solicitar |
|---|---|---|
| 0–10 min | Abrir projeto no VS Code, identificar versão e arquitetura | Estrutura de pastas, `GET /health` |
| 10–25 min | Recepção: cliente, veículo e agendamento | Cadastro e OS ABERTA |
| 25–45 min | Gerente atribui; mecânico filtra, registra diagnóstico e itens | EM_DIAGNOSTICO / EM_EXECUCAO, total e baixa |
| 45–55 min | Testar estoque insuficiente e tentativa de operação sem permissão | Erros sem alteração indevida |
| 55–65 min | Fechamento, histórico e impressão | OS FECHADA com total |
| 65–80 min | Gerente: reabrir, corrigir, fechar; estoque, usuários, relatório e auditoria | Justificativas e CSV |
| 80–90 min | Executar `npm test`; diferenciar teste unitário, integração e sistema | Resultado do terminal |
| 90–100 min | Revisão dos requisitos, UML, Git e manutenção; feedback de aceitação | Checklist e commit |

## Cenários para alunos (teste manual de sistema/aceitação)

Preencha o estado após execução: aprovado, reprovado ou não executado.

| ID | Dado / quando | Então | Estado na VM |
|---|---|---|---|
| AT01 | Login válido de atendente | Menu de recepção; usuários/auditoria ausentes | A executar |
| AT02 | Cadastrar cliente ativo e veículo | Ambos pesquisáveis e vínculo correto | A executar |
| AT03 | Agendar, reagendar e converter | OS criada; agenda concluída; segunda conversão negada | A executar |
| AT04 | Gerente atribui a mecânico | Filtro Minhas OS localiza a ordem | A executar |
| AT05 | Mecânico abre OS de outro responsável | Consulta permitida, alteração bloqueada | A executar |
| AT06 | Diagnóstico + serviço R$ 100 + uma P001 R$ 35 (preços iniciais) | Total R$ 135; estoque reduzido em 1 | A executar |
| AT07 | Consumir mais que estoque | Erro sem mudança nos itens/saldo | A executar |
| AT08 | Devolver peça não utilizada, informando motivo | Saldo restaurado, total recalculado | A executar |
| AT09 | Fechar OS vazia / fechar OS válida | Vazia rejeitada; válida fechada e bloqueada para alterações | A executar |
| AT10 | Reabrir com motivo e corrigir | Gerente pode reabrir; justificativa registrada | A executar |
| AT11 | Cancelar OS em andamento com motivo | Estado terminal, consumo mantido, excluída de valor de OS fechadas | A executar |
| AT12 | Consultar histórico e imprimir | Lista correta e resumo legível | A executar |
| AT13 | Gerente cadastra peça, repõe estoque e altera preço | Estoque atualizado; preço antigo da OS preservado | A executar |
| AT14 | Gerente cria/redefine/inativa usuário | Sessão revogada; usuário inativo não entra | A executar |
| AT15 | Gerente filtra relatório e exporta CSV | Somente OS fechadas no período, valores coerentes | A executar |
| AT16 | Gerente consulta auditoria | Operações relevantes e justificativas visíveis | A executar |
| AT17 | Aluno acessa de outro dispositivo pela rede autorizada | Sistema carrega; conexão HTTP estabelecida | A executar |
| AT18 | Parar servidor, executar backup e recuperar em arquivo separado | `integrity_check` ok, dados preservados | A executar |
| AT19 | Executar ações concorrentes com duas contas (mesma peça/OS) | Sem saldo negativo; estados atualizados após nova consulta | A executar |
| AT20 | Medir tempos das telas sob carga de turma | Critério RNF03 de 2 s avaliado nas condições registradas | A executar |

## Critério de conclusão

Registre versão, data, executor, sistema operacional, navegador, banco utilizado, entrada, resultado esperado/obtido. Não marque um cenário como aprovado sem evidência. CT31 (HTTP real) precisa ser executado após instalação do Express. Teste da rede Bridge e aceite da turma não são substituídos por testes locais.

## Exercícios de revisão

- Trace RF08/RN04/RN05 até rota, `OficinaService`, `EstoqueService`, `Peca`, repositórios e CT23.
- Compare esconder botão com verificar perfil no backend. Explique o código 403.
- Justifique por que registrar consumo e baixar saldo pertencem à mesma transação.
- Modele o novo caso de uso de atribuir mecânico; localize a coluna adicionada.
- Proponha alteração de requisito: orçamento acima de R$ 5.000 precisa de aprovação. Identifique alterações em modelo, código, testes e documentação; não implemente somente no HTML.

A atividade de encerramento mostra a cadeia Problema → requisitos → casos de uso/UML → arquitetura/dados → código → testes → implantação → manutenção e evolução incremental.
