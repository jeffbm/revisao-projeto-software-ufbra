# 06 — Plano de Testes

## 1. Objetivo

Fornecer evidências de que o Sistema Oficina Prime:

- atende aos requisitos;
- respeita regras de negócio;
- integra corretamente seus componentes;
- funciona ponta a ponta;
- pode ser aceito pelo usuário;
- mantém segurança, desempenho e consistência adequados ao MVP.

---

## 2. Escopo

### Incluído
- autenticação;
- cadastros;
- agenda;
- OS;
- diagnóstico;
- serviços;
- peças/estoque;
- fechamento;
- histórico;
- auditoria.

### Fora do escopo desta versão
- pagamento on-line;
- seguradoras;
- aplicativo;
- integrações não previstas no MVP.

---

## 3. Níveis e tipos de teste

### 3.1 Teste unitário

**Objetivo:** verificar uma unidade pequena de lógica isoladamente.

Exemplos:
- calcular subtotal;
- calcular total da OS;
- impedir fechamento sem serviço;
- impedir baixa maior que estoque;
- validar transição de estado.

Características:
- rápido;
- automatizável;
- sem banco real;
- falha aponta para unidade pequena.

---

### 3.2 Teste de integração

**Objetivo:** verificar colaboração entre componentes.

Exemplos:
- `OSService + OSRepository + banco`;
- `EstoqueService + PecaRepository`;
- fechar OS e persistir corretamente;
- registrar peça e reduzir estoque na mesma operação.

Atenção especial para transações e rollback.

---

### 3.3 Teste de sistema

**Objetivo:** validar o sistema completo, com fluxo realista.

Exemplo:

```text
Login
 → cadastrar cliente
 → cadastrar veículo
 → agendar
 → abrir OS
 → registrar diagnóstico
 → inserir serviço
 → inserir peça
 → fechar OS
 → consultar histórico
```

---

### 3.4 Teste de aceitação

**Objetivo:** confirmar que o sistema atende à necessidade do negócio.

Responsável:
- usuário-chave;
- representante da oficina;
- professor/cliente do projeto em contexto acadêmico.

Formato recomendado:

```text
DADO que ...
QUANDO ...
ENTÃO ...
```

---

### 3.5 Teste de regressão

Executado após alteração para verificar se funcionalidades anteriormente aprovadas continuam funcionando.

No modelo incremental, a regressão é obrigatória a cada incremento.

---

### 3.6 Teste de segurança

Verificar:

- login inválido;
- usuário sem permissão;
- acesso direto a operação restrita;
- proteção de senha;
- sessões;
- manipulação indevida de parâmetros;
- registros de auditoria.

---

### 3.7 Teste de desempenho

Avaliar:

- tempo de resposta;
- consultas de histórico;
- abertura de OS;
- comportamento sob volume compatível com a oficina.

Critério do MVP:
- telas principais em até 2 segundos em condições normais.

---

### 3.8 Teste de usabilidade

Avaliar se:
- rótulos são claros;
- navegação é previsível;
- mensagens de erro ajudam;
- tarefas frequentes exigem poucos passos;
- o usuário consegue concluir tarefas sem auxílio constante.

---

## 4. Ambiente

Ambiente de teste deve ser separado do ambiente de produção.

Deve conter:
- banco de teste;
- usuários de perfis diferentes;
- dados controlados;
- massa de teste reproduzível;
- versão identificada do software.

---

## 5. Critérios de entrada

Antes de executar testes formais:

- requisito aprovado;
- funcionalidade implementada;
- build executável;
- ambiente disponível;
- dados de teste definidos;
- caso de teste revisado.

---

## 6. Critérios de saída

Uma funcionalidade pode ser considerada pronta quando:

- testes críticos aprovados;
- defeitos críticos = 0;
- defeitos altos tratados;
- critérios de aceitação atendidos;
- evidências armazenadas;
- regressão aplicável concluída.

---

## 7. Severidade de defeitos

| Nível | Definição |
|---|---|
| Crítico | impede uso do sistema ou causa perda/inconsistência grave |
| Alto | funcionalidade principal falha sem alternativa aceitável |
| Médio | problema com alternativa de contorno |
| Baixo | impacto pequeno, visual ou não crítico |

---

## 8. Evidências

Cada execução deve registrar, quando aplicável:

- ID do teste;
- versão;
- data;
- executor;
- dados de entrada;
- resultado esperado;
- resultado obtido;
- status;
- captura/log quando houver falha.

---

## 9. Relação com os modelos de processo

| Modelo | Momento dos testes |
|---|---|
| Cascata | planejados antecipadamente; execução concentrada após implementação |
| Prototipação | validação precoce de entendimento + testes formais do produto final |
| Incremental | testes em cada incremento + regressão acumulada |
| Espiral | testes orientados aos riscos de cada volta |
