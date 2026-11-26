# Oficina Prime 2.0 — Atualização de encerramento do curso

**UFBRA · Projeto de Software | 25/11/2026**

Este pacote contém `src/` (aplicação completa) e `doc/` (documentação do projeto, atualizada). Foi reconstruído sobre os pacotes de referência da V1 disponíveis nesta conversa, não sobre o HEAD remoto: o acesso ao GitHub não estava disponível no ambiente de construção. Não contém `node_modules`, banco de produção, credenciais pessoais nem cópia de `.git`. Preserve `atividades/`, `respostas/`, `docs/` e demais arquivos do seu repositório.

## 1. O que mudou

- Interface responsiva em português, painéis por perfil, tabelas pesquisáveis, formulários e mensagens de validação.
- Recepção: cadastro e edição de clientes/veículos, agenda, abertura de OS, consulta, fechamento e histórico.
- Mecânico: fila de OS, filtro por responsabilidade e estado, detalhe com relato, diagnóstico, serviços, peças, subtotal, devolução de itens e fechamento.
- Gerente: todas as operações, atribuição de mecânico, reabertura/cancelamento justificados, gestão de estoque e usuários, relatório de OS fechadas (CSV/impressão) e auditoria.
- Permissões verificadas no servidor, transações com auditoria, validação numérica, migração aditiva do SQLite, backup verificável e massa didática isolada.
- Arquitetura original preservada (Node.js, Express, SQLite, HTML/CSS/JS). Sem framework adicional de frontend.

## 2. Atualizar a VM Kali Linux

Pare o servidor (`Ctrl+C`), feche outros processos que estejam usando o banco e faça uma cópia integral do repositório antes de sobrepor arquivos. Os exemplos assumem que o projeto está em `~/Aulas/revisao-projeto-software-ufbra` e que o ZIP foi colocado em `~/Downloads` (ajuste o caminho se necessário).

```bash
cd ~/Aulas/revisao-projeto-software-ufbra
git status --short
# Se houver alterações locais, revise/commite o que for apropriado antes de continuar.
cp -a "$PWD" "$HOME/backup-oficina-$(date +%Y%m%d-%H%M%S)"
unzip -o ~/Downloads/Oficina_Prime_V2_Completa.zip -d "$PWD"
cd src
npm install
npm test
npm start
```

O ZIP contém diretórios na raiz correta; não crie um segundo `src` dentro de `src`. A inicialização migra o banco anterior **sem apagar tabelas**. O arquivo padrão permanece `src/data/oficina-prime.db`. A migração foi testada com um banco legado simulado; faça backup porque modificações locais do seu banco/repositório não foram examinadas.

O servidor atende em `http://localhost:3000` e, se a rede Bridge permitir, também `http://IP_DA_VM:3000`. Verifique `ip -br addr` e `ss -lntp | grep :3000`. Na VM da conversa, o IP observado era `192.168.0.175`, mas o DHCP pode mudar esse endereço. O endpoint `/health` mostra a versão 2.0.0. O navegador pode precisar de `Ctrl+F5` para recarregar os arquivos estáticos.

## 3. Windows PowerShell

Extraia o ZIP na raiz do repositório com a opção de substituir arquivos, depois:

```powershell
cd "$HOME\OneDrive\Documentos\Aulas\ProjSoftware\Git\revisao-projeto-software-ufbra\src"
npm.cmd install
npm.cmd test
npm.cmd start
```

## 4. Credenciais iniciais e base de aula

| Login | Senha inicial | Perfil |
|---|---|---|
| atendente | 123456 | ATENDENTE |
| mecanico | 123456 | MECANICO |
| gerente | 123456 | GERENTE |

Se já existir banco, as credenciais existentes não são redefinidas. Na rede da faculdade, altere as senhas iniciais e crie contas individuais pelo gerente; a rede deve ser autorizada e restrita, com dados fictícios. As sessões duram até 8 h e não persistem após reinício do processo. O sistema usa HTTP local; não exponha à Internet.

Para usar uma base separada com exemplos prontos, estando em `src/`:

```bash
npm run demo
DATABASE_FILE=./data/oficina-demo.db npm start
```

O comando `demo` não sobrescreve uma base já existente. No Windows: `$env:DATABASE_FILE='./data/oficina-demo.db'; npm.cmd start`. Para voltar à base normal, encerre o processo e remova a variável (`Remove-Item Env:DATABASE_FILE` no PowerShell). No Kali, a atribuição inline acima vale apenas para aquele comando.

Para backup consistente, execute com a aplicação parada:

```bash
npm run backup
# ou, para a base fictícia:
DATABASE_FILE=./data/oficina-demo.db npm run backup
```

A cópia é gravada em `src/data/backups/` e verificada com `PRAGMA integrity_check`. Guarde uma cópia fora da VM; o backup diário automático não foi configurado. Para restauração, pare o servidor, preserve a base atual em outro local e copie o backup selecionado para o caminho original (preservando também os arquivos auxiliares SQLite, caso existam, até finalizar a recuperação).

## 5. Roteiro rápido de demonstração

1. Atendente cadastra um cliente fictício e seu veículo, agenda e converte o agendamento em OS.
2. Gerente atribui o mecânico; mecânico localiza a OS na fila `Minhas e sem responsável`.
3. Mecânico registra diagnóstico, serviço de R$ 100,00 e uma unidade de P001 (R$ 35,00, no catálogo inicial). Resultado esperado: R$ 135,00 e saldo reduzido em 1.
4. Tente baixa superior ao saldo; a API deve rejeitar sem alterar estoque nem OS.
5. Feche a OS, consulte histórico e imprima o resumo. Tente editar: deve ser bloqueado.
6. Gerente reabre com justificativa, corrige um lançamento e fecha novamente. Consulte relatório e auditoria.
7. Demonstre uma tentativa de acesso a ação administrativa por perfil inadequado. O backend deve responder 403.

## 6. Publicar no GitHub

Na raiz do repositório, revise as alterações e adicione apenas os arquivos pretendidos. Não publique banco, backup, senhas pessoais ou `node_modules`.

```bash
cd ~/Aulas/revisao-projeto-software-ufbra
git status --short
git diff --stat
git add src doc README-ATUALIZACAO-V2.md
git diff --cached --stat
git commit -m "Implementa Oficina Prime 2.0 com interfaces por perfil, gestão e testes"
git push origin main
```

O pacote não modifica seu GitHub automaticamente. `src/.gitignore` exclui `node_modules/`, `data/`, `.env` e logs; confira se esses arquivos nunca foram rastreados antes.

## 7. Evidências, limites e documentação

- 17 testes automatizados aprovados (7 originais e 10 de integração de serviço/SQLite).
- CT31, integração HTTP real com Express, ficou pendente no ambiente de construção: DNS impediu `npm install`. Depois de instalar as dependências na VM, espere **18 testes, 18 aprovados, 0 falhas e 0 ignorados**; execute e verifique em vez de presumir o resultado.
- Scripts de demonstração e backup foram executados em arquivos temporários, com verificação de integridade bem-sucedida.
- Consulte [documentação do incremento](doc/08-incremento-v2.md), [manual operacional](doc/09-manual-usuario.md), [API e permissões](doc/10-api-e-seguranca.md), [roteiro de aceitação](doc/11-aceitacao-e-entrega.md), [relatório de testes](doc/testes/resultado-v2.txt) e [guia do código](src/docs/GUIA-DIDATICO-CODIGO.md).
- A aplicação continua acadêmica. O relatório soma OS fechadas, não valores recebidos. Não inclui pagamentos, emissão fiscal, custos/lucro, compras automatizadas, orçamento/aprovação comercial formal, cadastro público de clientes ou integração com terceiros. SQLite usa REAL para quantidades/valores com arredondamento didático do total, não contabilidade fiscal. A interface é responsiva, mas usabilidade, carga simultânea real, desempenho de 2 s e aceitação na rede da faculdade exigem validação em campo.
