# Modelo Espiral — Oficina Prime

## 1. Conceito

O projeto avança em ciclos. Cada volta identifica objetivos, riscos, alternativas, validações e planejamento da próxima volta.

```text
Objetivos
   ↓
Identificar riscos
   ↓
Reduzir/validar riscos
   ↓
Construir/avaliar
   ↓
Planejar próxima volta
   ↺
```

## 2. Volta 1 — Risco de usabilidade

### Objetivo
Validar atendimento e agenda.

### Risco
Tela lenta ou confusa no balcão.

### Ação
Protótipo de agenda e abertura de OS.

### Evidência
Teste de usabilidade com atendente.

### Saída
Fluxos e campos refinados.

---

## 3. Volta 2 — Risco de consistência de estoque

### Objetivo
Garantir que peça utilizada reduza estoque corretamente.

### Riscos
- saldo negativo;
- falha parcial;
- OS salva sem baixa;
- baixa efetuada sem vínculo com OS.

### Ação
Modelar transação e executar prova técnica.

### Testes
- integração;
- rollback;
- concorrência básica.

### Saída
Estratégia transacional aprovada.

---

## 4. Volta 3 — Risco de ciclo de vida da OS

### Objetivo
Garantir transições válidas.

### Riscos
- fechar sem serviço;
- editar após fechamento;
- reabrir sem autorização.

### Ação
Diagrama de estados + regras.

### Testes
- unitário de transição;
- sistema;
- aceitação.

---

## 5. Volta 4 — Risco de segurança e auditoria

### Objetivo
Proteger dados e operações administrativas.

### Riscos
- usuário não autorizado;
- senha exposta;
- ação sem rastreabilidade.

### Ação
Perfis, auditoria, armazenamento seguro de credenciais.

### Testes
- autorização;
- autenticação;
- tentativa de acesso indevido;
- auditoria.

---

## 6. Quando usar

O Espiral é adequado quando:
- existem riscos técnicos relevantes;
- há incerteza;
- custo de falha é alto;
- é importante reduzir riscos progressivamente.

## 7. Diferença didática

No incremental, a pergunta principal é:

**“Qual parte funcional entregaremos agora?”**

No espiral:

**“Qual risco precisamos entender ou reduzir nesta volta?”**
