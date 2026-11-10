Modelagem UML

1. Objetivo

A modelagem serve para representar elementos importantes do sistema antes ou durante sua implementação.

Ela não substitui o código.

A modelagem auxilia o desenvolvedor a pensar sobre a estrutura e o comportamento do software.

2. Classes principais

Classe Tarefa

Atributos

titulo
concluida

Operações

concluir()
mostrar()

Representação simplificada:

+-----------------------+
|        Tarefa         |
+-----------------------+
| titulo                |
| concluida             |
+-----------------------+
| concluir()            |
| mostrar()             |
+-----------------------+

Classe ListaDeTarefas

Atributos

tarefas

Operações

adicionar()
listar()

Representação:

+-----------------------+
|    ListaDeTarefas     |
+-----------------------+
| tarefas               |
+-----------------------+
| adicionar()           |
| listar()              |
+-----------------------+

3. Relacionamento

Uma lista pode possuir várias tarefas.

ListaDeTarefas
      |
      | contém
      |
      +------ Tarefa
      +------ Tarefa
      +------ Tarefa

4. Caso de uso simplificado

Ator:

Estudante

Casos de uso:

Cadastrar tarefa
Consultar tarefas
Concluir tarefa

Representação conceitual:

             +------------------------+
             | Cadastrar tarefa       |
             +------------------------+

Estudante -->| Consultar tarefas      |

             +------------------------+
             | Concluir tarefa        |
             +------------------------+

5. Relação com os requisitos

Requisito

Elemento de projeto

RF01

ListaDeTarefas.adicionar()

RF02

ListaDeTarefas.listar()

RF03

Tarefa.concluir()

Essa relação é chamada de rastreabilidade.

Ela permite verificar como uma necessidade identificada no projeto aparece posteriormente na implementação.
