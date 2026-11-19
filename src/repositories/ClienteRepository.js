export class ClienteRepository {
  constructor(db) {
    this.db = db;
  }

  criar(cliente) {
    const result = this.db.prepare(`
      INSERT INTO clientes (nome, telefone, email, ativo)
      VALUES (?, ?, ?, ?)
    `).run(cliente.nome, cliente.telefone, cliente.email, cliente.ativo ? 1 : 0);

    return this.buscarPorId(Number(result.lastInsertRowid));
  }

  listar() {
    return this.db.prepare(`
      SELECT id, nome, telefone, email, ativo
      FROM clientes
      ORDER BY nome
    `).all();
  }

  buscarPorId(id) {
    return this.db.prepare(`
      SELECT id, nome, telefone, email, ativo
      FROM clientes WHERE id = ?
    `).get(id);
  }
}
