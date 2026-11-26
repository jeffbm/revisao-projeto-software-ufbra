/**
 * Entidade Peça.
 *
 * RN05: saldo não pode ficar negativo.
 */
export class Peca {
  constructor({ codigo, descricao, estoque = 0, valorUnitario = 0 }) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.estoque = Number(estoque);
    this.valorUnitario = Number(valorUnitario);
  }

  baixar(quantidade) {
    const qtd = Number(quantidade);

    if (!Number.isFinite(qtd) || qtd <= 0) {
      throw new Error("Quantidade deve ser maior que zero.");
    }

    if (qtd > this.estoque) {
      throw new Error("Estoque insuficiente.");
    }

    this.estoque -= qtd;
  }

  repor(quantidade) {
    const qtd = Number(quantidade);
    if (!Number.isFinite(qtd) || qtd <= 0) throw new Error("Quantidade deve ser maior que zero.");
    this.estoque += qtd;
  }
}
