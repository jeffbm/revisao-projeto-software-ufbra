# Modelo por Prototipação — Oficina Prime

## 1. Conceito

Um protótipo é construído para aprender sobre a necessidade antes de comprometer a solução definitiva.

```text
Requisitos iniciais
      ↓
Protótipo
      ↓
Avaliação do usuário
      ↓
Ajustes
      ↺
Requisitos compreendidos
      ↓
Projeto definitivo
```

## 2. Estratégia escolhida para este estudo

Será utilizada **prototipação descartável**: o protótipo serve para aprender e validar. Ele não deve ser tratado automaticamente como código de produção.

## 3. Protótipo 1 — Agenda

Telas:
- calendário;
- busca de cliente;
- seleção de veículo;
- horário;
- motivo.

Perguntas ao usuário:
- a busca por placa é mais rápida que por nome?
- quais campos precisam aparecer na agenda?
- como sinalizar conflito?

Feedback esperado:
- simplificar preenchimento;
- destacar placa;
- mostrar status visual.

## 4. Protótipo 2 — Abertura de OS

Telas:
- cliente/veículo;
- quilometragem;
- relato;
- botão abrir OS;
- confirmação do número.

Feedback:
- atendente pede busca por placa;
- mecânico pede espaço para diagnóstico;
- gerente pede histórico visível.

## 5. Protótipo 3 — Mecânico

Telas:
- lista de OS;
- diagnóstico;
- serviços;
- peças.

Validação:
- fluxo é compatível com uso na oficina?
- campos são suficientes?
- existem etapas desnecessárias?

## 6. Como os requisitos mudam

Exemplo:

**Antes:** “abrir OS”.

**Após feedback:** “abrir OS permitindo localizar o veículo por placa, exibir histórico recente e registrar relato inicial”.

## 7. Testes durante prototipação

O protótipo valida principalmente:
- compreensão;
- navegação;
- usabilidade;
- fluxo.

Depois, o produto definitivo ainda precisa de:
- unitário;
- integração;
- sistema;
- aceitação;
- segurança;
- desempenho.

## 8. Risco

Um protótipo rápido pode parecer “pronto”. A equipe deve deixar explícito que:
- pode não possuir arquitetura adequada;
- pode não ter segurança;
- pode não ter testes;
- pode usar dados simulados.
