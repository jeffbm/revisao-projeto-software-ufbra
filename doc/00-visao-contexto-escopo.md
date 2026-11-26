# 00 — Visão, contexto e escopo

## 1. Identificação

**Projeto:** Sistema de Gestão da Oficina Prime  
**Tipo:** Sistema de informação para oficina mecânica  
**Versão da especificação:** 2.0  
**Natureza:** Estudo de caso fictício para fins didáticos

## 2. Contexto

A Oficina Prime utiliza planilhas separadas, registros em papel e comunicação verbal para controlar clientes, veículos, agendamentos e serviços. O processo atual apresenta:

- cadastros duplicados;
- dificuldade para localizar histórico de veículos;
- ordens de serviço sem padrão;
- baixa rastreabilidade de alterações;
- peças utilizadas sem baixa consistente de estoque;
- dificuldade para acompanhar o andamento do serviço;
- ausência de uma visão única dos atendimentos.

## 3. Problema

A informação está fragmentada. Isso aumenta retrabalho, risco de erro, dificuldade de auditoria e dependência de conhecimento informal dos funcionários.

## 4. Objetivo geral

Construir um sistema que centralize e organize o atendimento da oficina, mantendo informações consistentes, rastreáveis e acessíveis aos usuários autorizados.

## 5. Objetivos específicos

1. Cadastrar clientes e veículos.
2. Agendar atendimentos.
3. Abrir e acompanhar ordens de serviço.
4. Registrar diagnóstico, serviços e peças.
5. Controlar baixa de peças utilizadas.
6. Fechar a OS com cálculo de valores.
7. Consultar o histórico de serviços por veículo.
8. Registrar usuário, data e hora das operações relevantes.

## 6. Partes interessadas

| Parte interessada | Interesse no sistema |
|---|---|
| Cliente | rapidez, transparência e histórico do serviço |
| Atendente | cadastro, agenda e abertura de OS |
| Mecânico | diagnóstico, serviços e peças |
| Gerente | controle, autorização, relatórios e auditoria |
| Administração da oficina | redução de retrabalho e melhoria do processo |
| Equipe de desenvolvimento | requisitos claros, arquitetura e critérios testáveis |

> **Parte interessada** é qualquer pessoa ou grupo que influencia o projeto ou é afetado por ele. Nem toda parte interessada é necessariamente usuária direta do sistema.

## 7. Escopo do MVP original e incremento 2.0

### Incluído

- autenticação;
- cadastro de cliente;
- cadastro de veículo;
- agenda;
- abertura de OS;
- diagnóstico;
- inclusão de serviços;
- inclusão de peças;
- fechamento da OS;
- consulta de histórico;
- auditoria básica.

### Fora do MVP

- pagamento on-line;
- aplicativo móvel;
- integração com seguradoras;
- compras automáticas;
- WhatsApp automatizado;
- BI avançado;
- emissão fiscal.

## 8. Premissas

- a oficina possui rede local e acesso ao sistema;
- cada usuário possui credencial individual;
- o cadastro de peças já possui código e saldo inicial;
- o gerente é responsável por operações administrativas sensíveis.

## 9. Restrições

- a primeira versão será simples e voltada ao uso interno;
- dados de clientes exigem controle de acesso;
- uma OS fechada não deve ser alterada livremente;
- operações relevantes devem ser rastreáveis.

## 10. Critério de sucesso

O projeto será considerado bem definido para implementação quando requisitos, regras, casos de uso, classes, arquitetura, dados, interações e testes principais estiverem rastreáveis e compreensíveis.

## 11. Escopo entregue na versão 2.0

O incremento inclui interface responsiva por perfil, consulta e atribuição de OS, administração de clientes, agenda, peças/estoque e usuários, relatório de valores de OS fechadas, impressão/CSV, auditoria consultável, backup manual verificável e base fictícia. O pagamento, emissão fiscal, integrações externas e BI avançado continuam fora do escopo. Consulte [incremento V2](08-incremento-v2.md).
