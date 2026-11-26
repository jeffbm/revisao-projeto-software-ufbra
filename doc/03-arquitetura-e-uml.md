# 03 — Arquitetura e UML

## 1. Arquitetura proposta

A solução será organizada em camadas.

```text
┌──────────────────────┐
│ Interface / UI       │
│ telas e interação    │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ Aplicação / Serviços │
│ casos de uso e fluxo │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ Domínio              │
│ regras e entidades   │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ Persistência         │
│ repositórios         │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ Banco de Dados       │
└──────────────────────┘
```

## 2. Responsabilidades

### Interface
- recebe comandos;
- valida formato simples;
- apresenta mensagens e resultados;
- não contém regras de negócio complexas.

### Aplicação/Serviços
- coordena casos de uso;
- abre e fecha transações;
- chama domínio e repositórios.

### Domínio
- representa entidades e regras essenciais;
- calcula total;
- valida fechamento;
- controla estados.

### Persistência
- salva e recupera objetos;
- não decide regras de negócio.

---

## 3. Classes de domínio

| Classe | Responsabilidade |
|---|---|
| Cliente | representar proprietário |
| Veiculo | representar veículo e vínculo com cliente |
| Agendamento | representar atendimento futuro |
| OrdemServico | controlar ciclo de vida e total |
| ItemServico | representar serviço executado |
| Peca | representar item de estoque |
| PecaUtilizada | representar consumo de peça na OS |
| Usuario | autenticação/perfil |
| Auditoria | registrar eventos relevantes |

---

## 4. Serviços de aplicação sugeridos

- `ClienteService`
- `VeiculoService`
- `AgendaService`
- `OSService`
- `EstoqueService`
- `AutenticacaoService`
- `AuditoriaService`

## 5. Repositórios

- `ClienteRepository`
- `VeiculoRepository`
- `AgendamentoRepository`
- `OSRepository`
- `PecaRepository`
- `UsuarioRepository`
- `AuditoriaRepository`

---

## 6. UML incluída

Os diagramas oficiais do modelo estão em `doc/uml/`:

- casos de uso;
- classes;
- sequência de abrir OS;
- sequência de fechar OS;
- sequência de agendamento;
- estados da OS;
- componentes;
- atividade de fechamento.

## 7. Princípio de projeto

**Alta coesão:** cada classe deve ter uma responsabilidade clara.  
**Baixo acoplamento:** componentes devem depender apenas do necessário.  
**Rastreabilidade:** toda decisão relevante deve apontar para requisito e teste.

## 8. Arquitetura concretizada na V2

`public/index.html`, `public/style.css` e `public/app.js` constituem uma SPA leve, sem framework. O servidor Express em `app.js` serve estáticos e API. `oficina.js` é o composition root, permitindo testar serviços/SQLite sem HTTP. `routes/registerApiRoutes.js` traduz HTTP para `OficinaService`, que centraliza RBAC, validação e transações. Os serviços da V1 e as classes de domínio permanecem. `GestaoRepository` contém novas consultas compostas, incluindo junções de OS, cliente, veículo e responsável. Os novos atributos de persistência são definidos na migração aditiva.

As classes conceituais ItemServico, PecaUtilizada, Agendamento e Usuario aparecem no modelo, mas a implementação usa objetos/linhas para elas; não são classes JavaScript independentes. Os diagramas descrevem o domínio, não uma correspondência um-a-um de arquivos. Consulte [API e segurança](10-api-e-seguranca.md).
