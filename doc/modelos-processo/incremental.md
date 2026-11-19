# Modelo Incremental — Oficina Prime

## 1. Conceito

O sistema é entregue em partes funcionais. Cada incremento acrescenta valor e passa por requisitos, projeto, implementação e testes.

```text
Incremento 1 → versão utilizável
      +
Incremento 2 → versão ampliada
      +
Incremento 3 → versão ampliada
      +
Incremento 4 → MVP completo
```

## 2. Planejamento

### Incremento 1 — Cadastros e autenticação
Escopo:
- RF01;
- RF02;
- RF03.

Classes:
- Usuario;
- Cliente;
- Veiculo.

Testes:
- unitários de validação;
- integração com repositórios;
- sistema: login + cadastro;
- aceitação: localizar veículo cadastrado.

### Incremento 2 — Agenda
Escopo:
- RF04;
- RF11.

Classes:
- Agendamento;
- AgendaService.

Testes:
- data/hora;
- conflitos;
- persistência;
- consulta por período.

### Incremento 3 — Ordem de Serviço
Escopo:
- RF05;
- RF06;
- RF07;
- RF09;
- RF10.

Classes:
- OrdemServico;
- ItemServico;
- OSService.

Testes:
- abertura;
- diagnóstico;
- serviço;
- fechamento;
- histórico.

### Incremento 4 — Estoque, auditoria e administração
Escopo:
- RF08;
- RF12;
- RF13;
- RF14.

Classes:
- Peca;
- PecaUtilizada;
- Auditoria;
- EstoqueService.

Testes:
- baixa de estoque;
- rollback;
- auditoria;
- autorização;
- regressão geral.

## 3. Regra de qualidade

Em todo incremento:

```text
Requisitos do incremento
 → projeto
 → código
 → testes unitários
 → integração
 → sistema
 → aceitação
 → regressão
 → entrega
```

## 4. Vantagens

- entrega cedo;
- feedback real;
- menor lote de mudança;
- defeitos encontrados mais cedo.

## 5. Atenções

- arquitetura deve suportar crescimento;
- integração entre incrementos deve ser testada;
- regressão aumenta a cada entrega.
