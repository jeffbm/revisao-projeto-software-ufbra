Arquitetura do Sistema

1. Objetivo

Este documento apresenta a organização inicial do Gerenciador de Tarefas de Estudo.

A arquitetura foi propositalmente simplificada para facilitar o entendimento da relação entre projeto e implementação.

2. Visão geral

O sistema será composto por:

+----------------------+
|       Usuário        |
+----------+-----------+
           |
           v
+----------------------+
|      Interface       |
|     index.html       |
+----------+-----------+
           |
           v
+----------------------+
|  Lógica da Aplicação |
|       app.js         |
+----------+-----------+
           |
           v
+----------------------+
|   Dados em memória   |
+----------------------+

3. Interface

Arquivo:

src/index.html

Responsabilidades:

apresentar os elementos visuais;

receber dados do usuário;

apresentar a lista de tarefas;

permitir iniciar ações.

A interface não deverá concentrar toda a lógica do sistema.

4. Lógica da aplicação

Arquivo:

src/app.js

Responsabilidades:

criar tarefas;

armazenar tarefas;

listar tarefas;

alterar o estado das tarefas;

controlar as operações da aplicação.

5. Dados

Na primeira versão, as tarefas serão armazenadas em memória.

Exemplo conceitual:

ListaDeTarefas
        |
        +--- Tarefa 1
        +--- Tarefa 2
        +--- Tarefa 3

Ao fechar ou atualizar a página, os dados poderão ser perdidos.

Isso é uma decisão de projeto da versão inicial e poderá ser alterado posteriormente.

6. Decisão de projeto

Foi escolhida uma arquitetura simples porque o objetivo inicial é validar:

requisitos;

estrutura da aplicação;

comportamento;

modelagem;

fluxo de desenvolvimento.

Adicionar banco de dados, servidor ou autenticação nesta etapa aumentaria a complexidade sem ser necessário para validar o conceito principal.

7. Evolução futura

Em uma nova versão, poderíamos ter:

Interface
    ↓
Lógica
    ↓
API
    ↓
Banco de Dados

Essa alteração representaria uma evolução arquitetural e exigiria atualização desta documentação.

