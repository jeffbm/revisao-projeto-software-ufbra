import { hashPassword } from "../utils/password.js";
import { Perfis } from "../config/constants.js";

/**
 * Dados iniciais para demonstração em sala.
 */
export function seed(db) {
  const count = db.prepare("SELECT COUNT(*) AS total FROM usuarios").get().total;

  if (count === 0) {
    const stmt = db.prepare(`
      INSERT INTO usuarios (login, senha_hash, perfil)
      VALUES (?, ?, ?)
    `);

    for (const [login, perfil] of [
      ["atendente", Perfis.ATENDENTE],
      ["mecanico", Perfis.MECANICO],
      ["gerente", Perfis.GERENTE]
    ]) {
      stmt.run(login, hashPassword("123456"), perfil);
    }
  }

  const pecas = db.prepare("SELECT COUNT(*) AS total FROM pecas").get().total;
  if (pecas === 0) {
    const stmt = db.prepare(`
      INSERT INTO pecas (codigo, descricao, estoque, valor_unitario)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run("P001", "Filtro de óleo", 20, 35.00);
    stmt.run("P002", "Óleo 5W30 - 1L", 50, 42.00);
    stmt.run("P003", "Pastilha de freio", 10, 180.00);
  }
}
