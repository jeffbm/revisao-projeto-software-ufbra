export class UsuarioRepository {
  constructor(db) {
    this.db = db;
  }

  buscarPorLogin(login) {
    return this.db.prepare(`
      SELECT id, login, senha_hash AS senhaHash, perfil, ativo
      FROM usuarios
      WHERE login = ?
    `).get(login);
  }
}
