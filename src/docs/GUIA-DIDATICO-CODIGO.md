# Guia didático para leitura do código

## Ordem recomendada

1. `domain/OrdemServico.js`
2. `domain/Peca.js`
3. `services/OSService.js`
4. `repositories/OSRepository.js`
5. `routes/registerApiRoutes.js`
6. `public/app.js`
7. testes

## O que observar

### 1. Domínio
As regras importantes não ficam na tela.

Exemplo:

```js
os.fechar()
```

A própria classe `OrdemServico` verifica se há serviços antes de mudar para `FECHADA`.

### 2. Serviço
O serviço coordena o caso de uso.

Exemplo:

```text
buscar OS
→ validar
→ calcular
→ salvar
→ auditar
```

### 3. Repositório
O repositório cuida apenas de persistência.

Ele não deve decidir se uma OS pode ser fechada.

### 4. Rota
A rota traduz HTTP para chamada de serviço.

### 5. Teste
O teste verifica o comportamento esperado pelo requisito.

## Pergunta para os alunos

Onde colocaríamos uma nova regra:

> “OS acima de R$ 5.000 exige aprovação do gerente”?

Uma boa resposta deve considerar que a regra pertence ao domínio/aplicação, não à interface.

## V2 — acompanhe uma requisição real

1. Em `public/app.js`, procure `call('pecas',b)`; o frontend envia POST com código e quantidade, sem decidir o saldo final.
2. Em `routes/registerApiRoutes.js`, encontre `/os/:numero/pecas`. O middleware de autenticação já identificou o usuário.
3. Em `services/OficinaService.js`, `editarOS` valida perfil, atribuição, estado e dados; a transação começa com `BEGIN IMMEDIATE`.
4. `EstoqueService.registrarPecaNaOS` usa savepoint e entidade `Peca.baixar`; repositórios gravam itens/saldo, auditoria registra o evento.
5. `OrdemServico.calcularTotal` determina o total; o serviço persiste e retorna o detalhe atualizado; a interface recarrega a OS.
6. CT23 força falha na auditoria e demonstra rollback real em SQLite. CT22 demonstra RBAC; CT21 fluxo de integração. CT31 testa a mesma aplicação por HTTP quando Express está disponível.

O design mantém a separação de camadas. `GestaoRepository` concentra consultas e SQL parametrizado; `OficinaService` centraliza as regras de aplicação e coordena serviços existentes. É uma fachada de casos de uso, não uma nova entidade de domínio. Como exercício de manutenção evolutiva, divida-a em módulos menores conforme o sistema crescer.
