/*
    Projeto: Gerenciador de Tarefas de Estudo
    Disciplina: Projeto de Software

    Requisitos implementados nesta versão:

    RF01 - Cadastrar tarefa
    RF02 - Listar tarefas
    RF03 - Concluir tarefa
*/


// ----------------------------------------------------
// Classe Tarefa
// ----------------------------------------------------

class Tarefa {

    constructor(titulo) {
        this.titulo = titulo;
        this.concluida = false;
    }

    concluir() {
        this.concluida = true;
    }

}


// ----------------------------------------------------
// Classe ListaDeTarefas
// ----------------------------------------------------

class ListaDeTarefas {

    constructor() {
        this.tarefas = [];
    }

    adicionar(titulo) {

        const novaTarefa = new Tarefa(titulo);

        this.tarefas.push(novaTarefa);

    }

    concluir(indice) {

        this.tarefas[indice].concluir();

    }

}


// ----------------------------------------------------
// Objeto principal da aplicação
// ----------------------------------------------------

const listaDeTarefas = new ListaDeTarefas();


// ----------------------------------------------------
// Elementos da interface
// ----------------------------------------------------

const campoTitulo =
    document.getElementById("tituloTarefa");

const botaoAdicionar =
    document.getElementById("botaoAdicionar");

const elementoLista =
    document.getElementById("listaTarefas");


// ----------------------------------------------------
// RF01 - Cadastrar tarefa
// ----------------------------------------------------

botaoAdicionar.addEventListener("click", function () {

    const titulo = campoTitulo.value.trim();

    if (titulo === "") {

        alert("Digite uma tarefa.");

        return;

    }

    listaDeTarefas.adicionar(titulo);

    campoTitulo.value = "";

    mostrarTarefas();

});


// ----------------------------------------------------
// RF02 - Listar tarefas
// ----------------------------------------------------

function mostrarTarefas() {

    elementoLista.innerHTML = "";

    listaDeTarefas.tarefas.forEach(
        function (tarefa, indice) {

            const item =
                document.createElement("li");

            item.textContent =
                tarefa.titulo;

            if (tarefa.concluida) {

                item.style.textDecoration =
                    "line-through";

            }


            // ----------------------------------------
            // RF03 - Concluir tarefa
            // ----------------------------------------

            const botaoConcluir =
                document.createElement("button");

            botaoConcluir.textContent =
                "Concluir";

            botaoConcluir.addEventListener(
                "click",
                function () {

                    listaDeTarefas.concluir(indice);

                    mostrarTarefas();

                }
            );


            item.appendChild(
                document.createTextNode(" ")
            );

            item.appendChild(
                botaoConcluir
            );

            elementoLista.appendChild(
                item
            );

        }
    );

}
