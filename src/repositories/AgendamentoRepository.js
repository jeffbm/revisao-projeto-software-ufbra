export class AgendamentoRepository {
  constructor(db) {
    this.db = db;
  }

  existeConflito(dataHora) {
    const row = this.db.prepare(`
      SELECT COUNT(*) AS total
      FROM agendamentos
      WHERE data_hora = ? AND status = 'AGENDADO'
    `).get(dataHora);

    return row.total > 0;
  }

  criar({ veiculoId, dataHora, motivo }) {
    const result = this.db.prepare(`
      INSERT INTO agendamentos (veiculo_id, data_hora, motivo)
      VALUES (?, ?, ?)
    `).run(veiculoId, dataHora, motivo);

    return this.db.prepare(`
      SELECT id, veiculo_id AS veiculoId, data_hora AS dataHora, motivo, status
      FROM agendamentos WHERE id = ?
    `).get(Number(result.lastInsertRowid));
  }

  listar() {
    return this.db.prepare(`
      SELECT a.id, a.data_hora AS dataHora, a.motivo, a.status,
             v.placa, v.marca, v.modelo
      FROM agendamentos a
      JOIN veiculos v ON v.id = a.veiculo_id
      ORDER BY a.data_hora
    `).all();
  }
}
