import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

/**
 * Banco SQLite.
 *
 * Para fins didáticos usamos o módulo nativo `node:sqlite`.
 * A função createDatabase permite criar banco em arquivo ou em memória.
 */
export function createDatabase(filename = "./data/oficina-prime.db") {
  if (filename !== ":memory:") {
    const dir = path.dirname(filename);
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(filename);

  // Habilita integridade referencial no SQLite.
  db.exec("PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");

  return db;
}
