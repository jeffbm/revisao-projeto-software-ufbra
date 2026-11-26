# 04 — Modelo de Dados e Dicionário

## 1. Modelo lógico resumido

```text
CLIENTE 1 ─── N VEICULO
VEICULO 1 ─── N AGENDAMENTO
VEICULO 1 ─── N ORDEM_SERVICO
ORDEM_SERVICO 1 ─── N ITEM_SERVICO
ORDEM_SERVICO 1 ─── N PECA_UTILIZADA
PECA 1 ─── N PECA_UTILIZADA
USUARIO 1 ─── N AUDITORIA
```

---

## 2. Dicionário de dados

### CLIENTE

| Campo | Tipo conceitual | Regra |
|---|---|---|
| id | inteiro/UUID | chave primária |
| nome | texto | obrigatório |
| telefone | texto | obrigatório |
| email | texto | opcional |
| ativo | booleano | padrão verdadeiro |

### VEICULO

| Campo | Tipo | Regra |
|---|---|---|
| id | inteiro/UUID | PK |
| cliente_id | FK | cliente obrigatório |
| placa | texto | única |
| marca | texto | obrigatório |
| modelo | texto | obrigatório |
| ano | inteiro | opcional |
| observacao | texto | opcional |

### AGENDAMENTO

| Campo | Tipo | Regra |
|---|---|---|
| id | PK | único |
| veiculo_id | FK | obrigatório |
| data_hora | data/hora | obrigatório |
| motivo | texto | obrigatório |
| status | enum | AGENDADO/CANCELADO/CONCLUIDO |

### ORDEM_SERVICO

| Campo | Tipo | Regra |
|---|---|---|
| numero | texto/inteiro | único |
| veiculo_id | FK | obrigatório |
| data_abertura | data/hora | automática |
| data_fechamento | data/hora | nula até fechar |
| status | enum | conforme diagrama de estados |
| quilometragem | inteiro | >= 0 |
| relato | texto | obrigatório |
| diagnostico | texto | preenchido posteriormente |
| total | decimal | calculado |

### ITEM_SERVICO

| Campo | Tipo | Regra |
|---|---|---|
| id | PK | único |
| os_numero | FK | obrigatório |
| descricao | texto | obrigatório |
| quantidade | decimal | > 0 |
| valor_unitario | decimal | >= 0 |
| subtotal | decimal | calculado |

### PECA

| Campo | Tipo | Regra |
|---|---|---|
| codigo | texto | PK/único |
| descricao | texto | obrigatório |
| estoque | decimal | >= 0 |
| valor_unitario | decimal | >= 0 |

### PECA_UTILIZADA

| Campo | Tipo | Regra |
|---|---|---|
| id | PK | único |
| os_numero | FK | obrigatório |
| peca_codigo | FK | obrigatório |
| quantidade | decimal | > 0 |
| valor_unitario | decimal | snapshot do preço |
| subtotal | decimal | calculado |

### USUARIO

| Campo | Tipo | Regra |
|---|---|---|
| id | PK | único |
| login | texto | único |
| senha_hash | texto | nunca texto puro |
| perfil | enum | ATENDENTE/MECANICO/GERENTE |
| ativo | booleano | padrão verdadeiro |

### AUDITORIA

| Campo | Tipo | Regra |
|---|---|---|
| id | PK | único |
| usuario_id | FK | obrigatório |
| data_hora | data/hora | automática |
| entidade | texto | ex.: ORDEM_SERVICO |
| identificador | texto | número/id afetado |
| operacao | texto | ABRIR/FECHAR/REABRIR/etc. |
| detalhe | texto | resumo/justificativa |

---

## 3. Integridade

- `VEICULO.cliente_id` deve apontar para cliente existente.
- `ORDEM_SERVICO.veiculo_id` deve apontar para veículo existente.
- exclusões físicas devem ser evitadas quando eliminarem histórico;
- baixa de estoque e inclusão de peça na OS devem compor uma operação transacional;
- o total da OS não deve depender de cálculo manual do usuário.

## 4. Campos adicionados pela migração V2

| Tabela | Campo | Tipo físico | Regra |
|---|---|---|---|
| ordens_servico | mecanico_id | INTEGER NULL REFERENCES usuarios(id) | Usuário ativo com perfil MECANICO na atribuição; nulo = sem responsável |
| agendamentos | os_numero | INTEGER NULL REFERENCES ordens_servico(numero) | Preenchido ao converter para OS; um agendamento só é convertido uma vez |
| pecas | estoque_minimo | REAL NOT NULL DEFAULT 5 | Alerta quando saldo <= mínimo |

Não há novas tabelas nem exclusão de colunas. Índices de status/veículo da OS, agenda e auditoria facilitam consulta. `subtotal` é calculado, não armazenado. Valor unitário em `pecas_utilizadas` preserva preço do lançamento. Quantidades e preços usam REAL no SQLite com arredondamento do total para duas casas, solução didática, não fiscal. A agenda usa data/hora local, enquanto abertura, fechamento e auditoria usam ISO em UTC.

Novas associações: USUARIO (mecânico) 0..1 → N ORDEM_SERVICO; AGENDAMENTO 0..1 ↔ 0..1 ORDEM_SERVICO (associação opcional no fluxo). A inativação preserva histórico e não apaga usuário.
