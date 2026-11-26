# 09 — Manual de operação da Oficina Prime 2.0

## Acesso e navegação

Abra o endereço informado pelo professor (por exemplo `http://192.168.0.175:3000` se este ainda for o IP da VM). Use sua conta. O menu lateral apresenta apenas os módulos do perfil. Em telas estreitas, use o botão de menu. `Sair` encerra a sessão; após oito horas ou reinício do servidor, entre novamente. Não use informações de clientes reais.

## Recepção — atendente

1. **Clientes → Novo cliente**: informe nome, telefone e e-mail opcional; salve. Pesquise por nome para localizar e editar.
2. **Veículos → Novo veículo**: escolha o proprietário ativo; informe placa, marca, modelo, ano e observação opcional. Não é preciso digitar IDs manualmente.
3. **Agenda → Novo agendamento**: escolha veículo, dia/hora e motivo. Use filtro de data e situação; reagende ou cancele com justificativa quando necessário. Não existe reserva de duração: o conflito é pelo horário exato.
4. Na chegada do veículo, clique **Abrir OS** no agendamento e informe quilometragem/relato. O agendamento será concluído e vinculado à OS criada. Também é possível criar OS diretamente pelo painel ou menu de OS.
5. Em **Ordens de serviço**, pesquise por placa, cliente ou número; clique **Consultar**. A recepção acompanha o trabalho, mas não registra serviços/peças. Quando houver serviço lançado, pode fechar com confirmação.
6. **Histórico de veículos**: escolha um veículo, veja todas as OS e abra o detalhe para imprimir o resumo. A impressão usa a função do navegador, que também pode salvar PDF.

## Oficina — mecânico

1. Entre com o perfil mecânico e abra **Ordens de serviço**. O padrão é `Em andamento` e `Minhas e sem responsável`. Altere os filtros para consultar outras situações/OS.
2. Clique **Consultar**. Leia os dados do veículo, cliente, quilometragem, relato, situação e responsável. OS atribuída a outro mecânico permanece apenas consultável.
3. Clique **Registrar diagnóstico** e descreva os achados. A OS assume `EM_DIAGNOSTICO` (não retorna a esse estado se já em execução).
4. Clique **Adicionar serviço**: descrição, quantidade e valor unitário. O lançamento marca `EM_EXECUCAO`.
5. Clique **Adicionar peça**: selecione código/descrição/saldo/preço. Informe quantidade. O sistema verifica o saldo atual no servidor, lança consumo e baixa estoque na mesma transação. O preço utilizado é o preço vigente no momento do lançamento.
6. Se houver erro, use **Remover** para serviço incorreto ou **Devolver** para peça não utilizada que realmente retorna ao estoque. Justificativa é obrigatória. O total é recalculado.
7. Confira o total. Clique **Fechar OS** e confirme. A OS fechada não aceita novos lançamentos; somente gerente pode reabrir.

## Administração — gerente

- **Painel:** indicadores globais de atendimento e estoque; total de OS fechadas. Não é fluxo de caixa.
- **Ordens de serviço:** localizar qualquer OS, atribuir responsável ativo (ou deixar sem responsável), acompanhar/lançar serviços e peças, fechar; reabrir fechada mediante justificativa; cancelar em andamento mediante justificativa. Se peça não foi usada, devolva antes de cancelar; se já foi usada, mantenha o consumo registrado. Cancelada é terminal.
- **Clientes:** ativar/inativar, além de operações da recepção. Inativação é bloqueada com OS em andamento.
- **Estoque:** cadastrar peças com código, preço de venda, mínimo e saldo inicial; alterar descrição/preço/mínimo; registrar entrada ou saída justificada. O mínimo é um alerta, não um pedido automático de compra.
- **Usuários:** criar contas individuais, escolher perfil, editar perfil e situação, redefinir senha (mínimo de oito caracteres). Não é possível visualizar senha/hash. A alteração revoga sessões. O próprio gerente não pode remover seu acesso gerencial. Reatribua OS ativas antes de inativar um mecânico.
- **Relatórios:** escolha datas de fechamento, pesquise e verifique número de OS fechadas, valor e ticket médio; exporte CSV separado por ponto e vírgula ou imprima. Reabertas e canceladas não compõem a soma.
- **Auditoria:** filtre os últimos 500 eventos por usuário, entidade, operação, identificador e detalhe. O histórico completo permanece no banco, não é apagado pelo limite de tela.

## Tratamento de problemas

| Mensagem | Procedimento |
|---|---|
| Credenciais inválidas | Verifique login/senha; gerente pode redefinir |
| Sessão terminou | Entre novamente |
| Perfil não permite | Solicite a operação ao perfil responsável |
| Estoque insuficiente | Reduza quantidade ou peça ao gerente para verificar reposição |
| OS fechada/cancelada | Consulte apenas; gerente pode reabrir somente fechada |
| Horário ocupado | Escolha outro horário |
| Registro duplicado | Consulte cadastro existente; não repita placa/login/código |
| Não foi possível carregar | Atualize, verifique servidor, IP e rede autorizada |

Não recarregue/repita uma operação enquanto o envio está em andamento. Atualize a consulta após outros usuários modificarem a OS. A validação final ocorre no servidor.
