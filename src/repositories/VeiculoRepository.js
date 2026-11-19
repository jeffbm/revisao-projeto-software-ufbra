export class VeiculoRepository {
  constructor(db) {
    this.db = db;
  }

  criar(veiculo) {
    const result = this.db.prepare(`
      INSERT INTO veiculos
      (cliente_id, placa, marca, modelo, ano, observacao)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      veiculo.clienteId,
      veiculo.placa,
      veiculo.marca,
      veiculo.modelo,
      veiculo.ano,
      veiculo.observacao
    );

    return this.buscarPorId(Number(result.lastInsertRowid));
  }

  buscarPorId(id) {
    return this.db.prepare(`
      SELECT id, cliente_id AS clienteId, placa, marca, modelo, ano, observacao
      FROM veiculos WHERE id = ?
    `).get(id);
  }

  listar() {
    return this.db.prepare(`
      SELECT v.id, v.cliente_id AS clienteId, v.placa, v.marca, v.modelo, v.ano,
             c.nome AS clienteNome
      FROM veiculos v
      JOIN clientes c ON c.id = v.cliente_id
      ORDER BY v.placa
    `).all();
  }
}
