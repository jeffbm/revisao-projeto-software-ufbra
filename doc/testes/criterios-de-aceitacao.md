# Critérios de Aceitação

## RF05 — Abrir OS

```text
DADO que o usuário está autenticado
E existe um veículo cadastrado
QUANDO o atendente informa os dados obrigatórios e confirma
ENTÃO o sistema deve gerar um número único
E gravar a OS com status ABERTA
E registrar usuário, data e hora
E permitir consulta imediata.
```

## RF08 — Registrar peça utilizada

```text
DADO que existe uma OS não fechada
E a peça possui saldo suficiente
QUANDO o mecânico adiciona uma quantidade
ENTÃO a peça deve ser vinculada à OS
E o estoque deve ser reduzido
E a operação deve ser consistente.
```

## RF09 — Fechar OS

```text
DADO que existe uma OS aberta
E existe pelo menos um serviço executado
QUANDO o usuário solicita o fechamento
ENTÃO o sistema calcula o total
E altera o status para FECHADA
E registra data/hora e usuário
E impede inclusão posterior de itens sem reabertura autorizada.
```

## RF10 — Consultar histórico

```text
DADO que existe um veículo com atendimentos anteriores
QUANDO o usuário consulta o histórico
ENTÃO o sistema apresenta apenas as OS relacionadas ao veículo
COM data, serviços, peças, total e status.
```

## RF13 — Reabrir OS

```text
DADO que uma OS está FECHADA
QUANDO um usuário sem perfil GERENTE tenta reabri-la
ENTÃO o sistema deve negar a operação.

DADO que uma OS está FECHADA
E o usuário possui perfil GERENTE
QUANDO informa justificativa e confirma
ENTÃO a OS pode ser reaberta
E a justificativa deve ficar registrada em auditoria.
```
