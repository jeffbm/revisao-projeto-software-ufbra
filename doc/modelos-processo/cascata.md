# Modelo em Cascata — Oficina Prime

## 1. Conceito

O desenvolvimento é organizado em fases sequenciais. A saída de uma fase serve de entrada para a seguinte.

```text
Requisitos
   ↓
Análise e Projeto
   ↓
Implementação
   ↓
Testes
   ↓
Implantação
   ↓
Manutenção
```

## 2. Aplicação ao projeto

### Fase 1 — Requisitos
Entregáveis:
- visão e escopo;
- RF/RNF/RN;
- casos de uso;
- critérios de aceitação.

**Marco:** requisitos aprovados.

### Fase 2 — Análise e Projeto
Entregáveis:
- arquitetura;
- classes;
- diagramas de sequência;
- estados;
- dados;
- rastreabilidade;
- plano de testes.

**Marco:** projeto aprovado.

### Fase 3 — Implementação
Módulos:
1. autenticação;
2. cliente/veículo;
3. agenda;
4. OS;
5. serviços/peças;
6. fechamento/histórico.

### Fase 4 — Testes
Sequência:
- unitário;
- integração;
- sistema;
- aceitação.

### Fase 5 — Implantação
- preparar banco;
- configurar usuários;
- migrar dados necessários;
- treinar usuários;
- liberar versão.

### Fase 6 — Manutenção
- corretiva;
- adaptativa;
- evolutiva;
- preventiva.

## 3. Vantagem

Grande clareza documental e de marcos.

## 4. Risco

Se o usuário perceber tarde que a tela ou processo não atende à rotina real, a mudança pode ser cara.

## 5. Quando usar

Adequado quando:
- requisitos são estáveis;
- escopo é conhecido;
- mudanças são controladas;
- há necessidade forte de aprovação formal por fases.

## 6. Testes no Cascata

Embora executados principalmente após a implementação, os testes devem ser **planejados já na fase de projeto**.
