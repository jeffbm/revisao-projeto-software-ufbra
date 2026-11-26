# 07 — Critérios de Prontidão para Programação

A implementação pode começar quando existe **entendimento suficiente**, não quando todas as dúvidas possíveis desapareceram.

## Checklist

- [ ] problema e objetivo definidos;
- [ ] partes interessadas identificadas;
- [ ] escopo do MVP aprovado;
- [ ] requisitos funcionais registrados;
- [ ] requisitos não funcionais registrados;
- [ ] regras de negócio registradas;
- [ ] casos de uso principais descritos;
- [ ] classes e responsabilidades definidas;
- [ ] arquitetura definida;
- [ ] modelo de dados definido;
- [ ] interações críticas modeladas;
- [ ] estados importantes modelados;
- [ ] critérios de aceitação definidos;
- [ ] matriz de rastreabilidade criada;
- [ ] plano de testes criado;
- [ ] casos críticos de teste escritos;
- [ ] estrutura do repositório definida;
- [ ] convenção de versionamento e commits definida.

## Definição de pronto para implementar

Um item está pronto para desenvolvimento quando:

1. possui requisito identificável;
2. possui critério de aceitação;
3. regras de negócio estão claras;
4. dependências são conhecidas;
5. design básico existe;
6. teste esperado é conhecido.

## Exemplo

**RF09 — Fechar OS**

Antes do código, a equipe sabe:

- quem pode executar;
- quais pré-condições existem;
- como o total é calculado;
- que não pode fechar sem serviço;
- que estoque precisa estar consistente;
- qual estado final será gravado;
- quais testes provarão que funciona.

Isso reduz decisões improvisadas durante a programação.

## Pós-implementação (V2)

O checklist acima permanece como referência de entrada. Para a entrega, execute a regressão, revise o diff, valide o fluxo por perfil em ambiente real, faça backup, registre evidências e publique a versão somente após aprovação. Consulte [11](11-aceitacao-e-entrega.md).
