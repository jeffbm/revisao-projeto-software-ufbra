Atividade 01 — Do Projeto para a Implementação

Objetivo

Analisar o projeto antes de modificar o código.

A atividade deve ser realizada utilizando os documentos do repositório:

README.md
docs/requisitos.md
docs/arquitetura.md
docs/uml.md

Parte 1 — Entendendo o problema

Responda:

Qual problema o sistema procura resolver?

Quem é o usuário principal?

Por que o sistema não possui banco de dados nesta primeira versão?

Cite uma funcionalidade que está fora do escopo atual.

Parte 2 — Requisitos

Considere:

RF01 — cadastrar tarefa
RF02 — listar tarefas
RF03 — concluir tarefa

Responda:

Qual desses requisitos está relacionado à entrada de dados?

Qual requisito apresenta informações ao usuário?

Qual requisito altera o estado de um objeto?

Parte 3 — Arquitetura

Observe:

Interface
    ↓
Lógica
    ↓
Dados

Responda:

Qual arquivo representa a interface?

Qual arquivo deverá concentrar a lógica da aplicação?

Por que separar interface e lógica pode facilitar a manutenção?

Parte 4 — Orientação a Objetos

Considere as classes:

Tarefa
ListaDeTarefas

Responda:

Qual classe representa uma atividade individual?

Qual classe mantém o conjunto de tarefas?

Qual operação deverá alterar uma tarefa de pendente para concluída?

Parte 5 — Rastreabilidade

Complete:

Requisito

Elemento de implementação

RF01 — cadastrar

__________________

RF02 — listar

__________________

RF03 — concluir

__________________

Parte 6 — Manutenção

Após a primeira versão, um usuário solicita:

“Gostaria que cada tarefa tivesse uma data limite.”

Responda:

Isso representa correção de erro ou evolução do software?

Qual documento deverá ser alterado antes ou junto da implementação?

A classe Tarefa precisará mudar?

Qual novo atributo poderia ser criado?

Parte 7 — Git

Consulte o histórico:

git log --oneline

Responda:

Quantos commits existem?

Qual foi o primeiro commit?

O histórico permite compreender a evolução do projeto?

Parte 8 — Trabalho da dupla

Crie uma branch local:

git switch -c dupla-nome

Após realizar uma pequena alteração documental:

git status
git add .
git commit -m "docs: registra atividade de revisão"

Não envie alterações para a main.

Para retornar à versão oficial:

git switch main
git pull

Reflexão final

Responda com suas próprias palavras:

Por que, em Projeto de Software, começar diretamente pela programação pode produzir um sistema que funciona, mas não necessariamente um bom projeto de software?
