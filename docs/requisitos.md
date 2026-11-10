Requisitos do Sistema

1. Identificação

Sistema: Gerenciador de Tarefas de Estudo
Versão: 1.0

2. Problema

Estudantes precisam controlar diferentes atividades acadêmicas.

Sem uma organização mínima, tarefas podem ser esquecidas, duplicadas ou realizadas fora do prazo.

O sistema proposto deverá fornecer uma forma simples de registrar e acompanhar tarefas de estudo.

3. Usuário principal

O usuário principal é um estudante que deseja organizar suas atividades acadêmicas.

4. Requisitos funcionais

RF01 — Cadastrar tarefa

O sistema deverá permitir que o usuário informe o título de uma tarefa e a adicione à lista.

RF02 — Listar tarefas

O sistema deverá apresentar todas as tarefas cadastradas.

RF03 — Concluir tarefa

O sistema deverá permitir que uma tarefa seja marcada como concluída.

5. Requisitos não funcionais

RNF01 — Facilidade de uso

A interface deverá ser simples e permitir a utilização sem treinamento específico.

RNF02 — Execução

A aplicação deverá funcionar em um navegador Web moderno.

RNF03 — Manutenibilidade

O código deverá ser organizado de forma que novas funcionalidades possam ser incorporadas posteriormente.

RNF04 — Documentação

Alterações relevantes no sistema deverão ser acompanhadas de atualização da documentação.

6. Restrições da versão inicial

A primeira versão:

não utilizará banco de dados;

não possuirá autenticação;

não utilizará servidor;

não realizará sincronização pela Internet;

armazenará os dados apenas durante a execução da aplicação.

7. Rastreabilidade inicial

Requisito

Elemento previsto

RF01

campo de texto + botão Adicionar

RF02

lista apresentada na interface

RF03

função para alterar o estado da tarefa

8. Evoluções possíveis

Futuras versões poderão incluir:

prazo para conclusão;

prioridade;

categorias;

armazenamento permanente;

autenticação;

sincronização;

notificações.

Essas alterações deverão ser analisadas antes da implementação.
