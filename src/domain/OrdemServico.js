import { StatusOS } from "../config/constants.js";

/**
 * Entidade central do projeto.
 *
 * Aqui ficam regras do domínio da OS, e não detalhes de HTTP/SQLite.
 */
export class OrdemServico {
  constructor({
    numero = null,
    veiculoId,
    dataAbertura = new Date().toISOString(),
    dataFechamento = null,
    status = StatusOS.ABERTA,
    quilometragem = 0,
    relato,
    diagnostico = null,
    total = 0,
    servicos = [],
    pecas = []
  }) {
    if (!veiculoId) throw new Error("OS exige veículo cadastrado."); // RN01
    if (!relato?.trim()) throw new Error("Relato inicial é obrigatório.");
    if (Number(quilometragem) < 0) throw new Error("Quilometragem inválida.");

    this.numero = numero;
    this.veiculoId = Number(veiculoId);
    this.dataAbertura = dataAbertura;
    this.dataFechamento = dataFechamento;
    this.status = status;
    this.quilometragem = Number(quilometragem);
    this.relato = relato.trim();
    this.diagnostico = diagnostico;
    this.total = Number(total);
    this.servicos = servicos;
    this.pecas = pecas;
  }

  assertEditavel() {
    // RN03: OS fechada não recebe novos itens.
    if ([StatusOS.FECHADA, StatusOS.CANCELADA].includes(this.status)) {
      throw new Error("OS fechada/cancelada não pode ser alterada.");
    }
  }

  registrarDiagnostico(texto) {
    this.assertEditavel();
    if (!texto?.trim()) throw new Error("Diagnóstico é obrigatório.");

    this.diagnostico = texto.trim();
    this.status = StatusOS.EM_DIAGNOSTICO;
  }

  adicionarServico({ descricao, quantidade, valorUnitario }) {
    this.assertEditavel();

    const qtd = Number(quantidade);
    const valor = Number(valorUnitario);

    if (!descricao?.trim()) throw new Error("Descrição do serviço é obrigatória.");
    if (qtd <= 0 || valor < 0) throw new Error("Quantidade/valor inválidos.");

    this.servicos.push({ descricao: descricao.trim(), quantidade: qtd, valorUnitario: valor });
    this.status = StatusOS.EM_EXECUCAO;
  }

  adicionarPeca({ codigo, descricao, quantidade, valorUnitario }) {
    this.assertEditavel();

    const qtd = Number(quantidade);
    const valor = Number(valorUnitario);

    if (qtd <= 0 || valor < 0) throw new Error("Quantidade/valor inválidos.");

    this.pecas.push({ codigo, descricao, quantidade: qtd, valorUnitario: valor });
  }

  calcularTotal() {
    const totalServicos = this.servicos.reduce(
      (soma, item) => soma + item.quantidade * item.valorUnitario, 0
    );

    const totalPecas = this.pecas.reduce(
      (soma, item) => soma + item.quantidade * item.valorUnitario, 0
    );

    return Number((totalServicos + totalPecas).toFixed(2)); // RN12
  }

  fechar() {
    this.assertEditavel();

    // RN06: pelo menos um serviço é obrigatório.
    if (this.servicos.length === 0) {
      throw new Error("Não é possível fechar OS sem serviço executado.");
    }

    this.total = this.calcularTotal();
    this.status = StatusOS.FECHADA;
    this.dataFechamento = new Date().toISOString();
  }

  reabrir() {
    if (this.status !== StatusOS.FECHADA) {
      throw new Error("Somente OS fechada pode ser reaberta.");
    }

    this.status = StatusOS.ABERTA;
    this.dataFechamento = null;
  }

  cancelar() {
    if (this.status === StatusOS.FECHADA) {
      throw new Error("OS fechada deve ser reaberta antes do cancelamento.");
    }

    this.status = StatusOS.CANCELADA;
  }
}
