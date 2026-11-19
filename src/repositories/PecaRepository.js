import { Peca } from "../domain/Peca.js";

export class PecaRepository {
  constructor(db) {
    this.db = db;
  }

  buscar(codigo) {
    const row = this.db.prepare(`
      SELECT codigo, descricao, estoque, valor_unitario AS valorUnitario
      FROM pecas WHERE codigo = ?
    `).get(codigo);

    return row ? new Peca(row) : null;
  }

  salvar(peca) {
    this.db.prepare(`
      UPDATE pecas SET estoque = ?, valor_unitario = ?
      WHERE codigo = ?
    `).run(peca.estoque, peca.valorUnitario, peca.codigo);
  }

  listar() {
    return this.db.prepare(`
      SELECT codigo, descricao, estoque, valor_unitario AS valorUnitario
      FROM pecas ORDER BY codigo
    `).all();
  }
}
