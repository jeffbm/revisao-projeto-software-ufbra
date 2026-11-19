# `/src` — Implementação de Referência: Oficina Prime

Este diretório concretiza o projeto documentado da **Oficina Prime**.

A implementação foi escrita para fins didáticos. Ela mostra como transformar:

```text
Requisitos
  ↓
Casos de uso
  ↓
Classes e arquitetura
  ↓
Código
  ↓
Testes
```

## Tecnologias

- Node.js 22+
- Express
- SQLite por meio do módulo nativo `node:sqlite`
- HTML/CSS/JavaScript no frontend
- `node:test` para testes automatizados

## Estrutura

```text
src/
├── app.js
├── server.js
├── config/
├── database/
├── domain/
├── repositories/
├── services/
├── middleware/
├── routes/
└── public/
```

## Relação com a arquitetura

```text
public/             → Interface
routes/             → Entrada HTTP / controladores
services/           → Casos de uso / aplicação
domain/             → Entidades e regras
repositories/       → Persistência
database/           → SQLite
```

## Como executar

```bash
npm install
npm start
```

Acesse:

```text
http://localhost:3000
```

## Usuários de demonstração

O banco inicial cria:

| Login | Senha | Perfil |
|---|---|---|
| atendente | `123456` | ATENDENTE |
| mecanico | `123456` | MECANICO |
| gerente | `123456` | GERENTE |

> Essas credenciais existem apenas para aula. Em produção, senhas padrão são inadequadas.

## Testes

```bash
npm test
```

Os testes automatizados cobrem regras importantes previstas no plano, como:

- fechamento sem serviço;
- cálculo do total;
- saldo de estoque;
- transições da OS;
- autorização de gerente.

## Observação

Esta aplicação é uma **implementação pedagógica de referência**, não um produto pronto para produção. Aspectos como autenticação distribuída, observabilidade, backup operacional, proteção CSRF, rate limiting e deployment devem ser aprofundados em uma solução real.
