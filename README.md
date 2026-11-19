# Oficina Prime — Projeto de Software de Referência

> **Modelo acadêmico de documentação de Projeto de Software**  
> Disciplina: Projeto de Software — UFBRA  
> Estudo de caso fictício: **Sistema de Gestão da Oficina Prime**

Este repositório apresenta um projeto completo de software **até a entrada na implementação**, com documentação de requisitos, UML, arquitetura, dados, rastreabilidade, quatro modelos de processo e planejamento de testes.

O objetivo é servir como **modelo de consulta** para trabalhos futuros. O aluno não deve apenas copiar os documentos: deve adaptar a estrutura ao problema, aos requisitos e às decisões do seu próprio projeto.

## 1. Problema resumido

A Oficina Prime controla clientes, veículos e serviços por planilhas, papéis e comunicação verbal. Isso causa duplicidade de dados, perda de histórico, falhas de estoque, dificuldade para acompanhar ordens de serviço e baixa rastreabilidade.

O software proposto centraliza:

- clientes e veículos;
- agenda de atendimentos;
- ordens de serviço (OS);
- diagnóstico e serviços executados;
- peças utilizadas;
- fechamento da OS;
- histórico por veículo;
- autenticação, autorização e auditoria.

## 2. Estrutura da documentação

| Documento | Finalidade |
|---|---|
| [00 — Visão, contexto e escopo](doc/00-visao-contexto-escopo.md) | Problema, objetivos, partes interessadas, escopo e MVP |
| [01 — Requisitos](doc/01-requisitos.md) | Requisitos funcionais, não funcionais e regras de negócio |
| [02 — Casos de uso](doc/02-casos-de-uso.md) | Atores, casos de uso e fluxos principais |
| [03 — Arquitetura e UML](doc/03-arquitetura-e-uml.md) | Arquitetura, classes, estados e interações |
| [04 — Dados](doc/04-modelo-de-dados.md) | Modelo lógico e dicionário de dados |
| [05 — Rastreabilidade](doc/05-rastreabilidade.md) | Requisito → projeto → teste |
| [06 — Plano de testes](doc/06-plano-de-testes.md) | Estratégia, níveis, critérios e evidências |
| [07 — Pronto para programar](doc/07-pronto-para-programar.md) | Critérios de entrada na implementação |

### Quatro modelos de processo

- [Cascata](doc/modelos-processo/cascata.md)
- [Incremental](doc/modelos-processo/incremental.md)
- [Prototipação](doc/modelos-processo/prototipacao.md)
- [Espiral](doc/modelos-processo/espiral.md)
- [Comparação dos quatro modelos](doc/modelos-processo/comparacao.md)

### Testes

- [Casos de teste](doc/testes/casos-de-teste.md)
- [Critérios de aceitação](doc/testes/criterios-de-aceitacao.md)

### UML em PlantUML

Os fontes `.puml` ficam em [`doc/uml/`](doc/uml/):

- `casos-de-uso.puml`
- `classes.puml`
- `sequencia-abrir-os.puml`
- `sequencia-fechar-os.puml`
- `sequencia-agendar.puml`
- `estados-os.puml`
- `componentes.puml`
- `atividade-fechar-os.puml`

Esses diagramas utilizam notação UML e podem ser renderizados com PlantUML, inclusive pela extensão PlantUML do VS Code.

## 3. Linha mestra do projeto

```text
Problema
   ↓
Visão e escopo
   ↓
Requisitos e regras de negócio
   ↓
Casos de uso
   ↓
Arquitetura + UML + dados
   ↓
Rastreabilidade
   ↓
Planejamento dos testes
   ↓
Critérios de prontidão
   ↓
Implementação
```

## 4. Ideia central

**A programação não inicia o projeto. Ela implementa decisões que já foram compreendidas, documentadas, modeladas e tornadas testáveis.**
