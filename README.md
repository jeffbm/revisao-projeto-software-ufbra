# Projeto de Software — Aula Prática e Revisão

## Projeto: Gerenciador de Tarefas de Estudo

Este repositório é utilizado nas aulas práticas da disciplina **Projeto de Software**.

O objetivo não é apenas desenvolver um programa funcional. O trabalho deverá demonstrar a relação entre:

**problema → requisitos → projeto → modelagem → implementação → testes → manutenção → documentação**

Durante a aula, todos os alunos utilizarão este repositório como referência comum.

---

## 1. Problema

Estudantes precisam organizar atividades acadêmicas, trabalhos, exercícios e tarefas que devem ser realizadas.

Quando essas informações são mantidas apenas na memória, em anotações dispersas ou em diferentes aplicativos, tarefas podem ser esquecidas ou realizadas fora do prazo.

---

## 2. Solução proposta

Será desenvolvido um pequeno **Gerenciador de Tarefas de Estudo**.

A primeira versão deverá permitir:

- cadastrar uma tarefa;
- visualizar as tarefas cadastradas;
- marcar uma tarefa como concluída.

Esta versão será propositalmente simples para que possamos estudar o processo de desenvolvimento de software.

---

## 3. Escopo da versão 1

### Incluído

- cadastro de tarefa;
- listagem de tarefas;
- indicação de tarefa concluída;
- interface simples em navegador;
- documentação do projeto;
- controle de versão com Git.

### Fora do escopo inicial

Nesta primeira versão não serão implementados:

- login de usuários;
- banco de dados;
- sincronização em nuvem;
- compartilhamento de tarefas;
- notificações;
- aplicativo para celular.

Essas funcionalidades poderão representar futuras evoluções do sistema.

---

## 4. Organização do repositório

```text
revisao-projeto-software-ufbra/
│
├── README.md
│
├── docs/
│   ├── requisitos.md
│   ├── arquitetura.md
│   └── uml.md
│
├── src/
│   ├── index.html
│   └── app.js
│
├── atividades/
│   └── atividade01.md
│
└── respostas/
```

---

## 5. Documentação

A documentação faz parte do projeto e deverá acompanhar sua evolução.

Os principais documentos estão na pasta `docs`.

### requisitos.md

Descreve:

- problema;
- usuários;
- requisitos funcionais;
- requisitos não funcionais;
- regras e restrições.

### arquitetura.md

Apresenta a organização inicial da solução.

### uml.md

Apresenta a modelagem orientada a objetos utilizada para apoiar a implementação.

---

## 6. Arquitetura inicial

A aplicação será dividida inicialmente em três partes:

```text
Usuário
   ↓
Interface
index.html
   ↓
Lógica da aplicação
app.js
   ↓
Dados em memória
```

Nesta primeira versão os dados existirão apenas durante a execução da página.

---

## 7. Controle de versão

O Git será utilizado para registrar a evolução do projeto.

Exemplos de marcos:

```text
docs: adiciona requisitos iniciais

docs: adiciona arquitetura do sistema

docs: adiciona modelagem UML

feat: implementa cadastro de tarefas

feat: implementa conclusão de tarefas

fix: corrige exibição da lista
```

O histórico do Git deverá contar a história do desenvolvimento do sistema.

---

## 8. Fluxo da aula

O professor manterá a versão oficial na branch:

```text
main
```

Para obter o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Entrar na pasta:

```bash
cd revisao-projeto-software-ufbra
```

Abrir no VS Code:

```bash
code .
```

Durante a aula, para receber atualizações:

```bash
git pull
```

---

## 9. Regra importante

Durante esta aula, a branch `main` representa a versão oficial publicada pelo professor.

Os alunos poderão criar branches locais para realizar experimentos e registrar seu trabalho sem alterar a versão oficial.

Exemplo:

```bash
git switch -c atividade-nome
```

---

## 10. O que será observado

Ao final da atividade, o aluno deverá ser capaz de explicar:

1. Qual problema o software procura resolver?
2. Quais são seus requisitos?
3. Qual é o escopo da primeira versão?
4. Como o sistema foi organizado?
5. Como a modelagem ajuda na implementação?
6. Como os requisitos aparecem no código?
7. Por que utilizar controle de versão?
8. Como documentar uma alteração?
9. Qual a diferença entre corrigir um defeito e evoluir o sistema?
10. Por que documentação e código precisam permanecer coerentes?

---

## Disciplina

**Projeto de Software**

Professor: **Jefferson Brandão**

UFBRA
