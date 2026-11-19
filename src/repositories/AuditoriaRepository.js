export class AuditoriaRepository {
  constructor(db) {
    this.db = db;
  }

  registrar({ usuarioId, entidade, identificador, operacao, detalhe = null }) {
    this.db.prepare(`
      INSERT INTO auditoria
      (usuario_id, data_hora, entidade, identificador, operacao, detalhe)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      usuarioId,
      new Date().toISOString(),
      entidade,
      String(identificador),
      operacao,
      detalhe
    );
  }
}
