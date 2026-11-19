# Guia didático para leitura do código

## Ordem recomendada

1. `domain/OrdemServico.js`
2. `domain/Peca.js`
3. `services/OSService.js`
4. `repositories/OSRepository.js`
5. `routes/osRoutes.js`
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
