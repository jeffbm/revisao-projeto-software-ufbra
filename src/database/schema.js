/**
 * Criação das tabelas.
 *
 * O esquema abaixo reflete o modelo de dados descrito na documentação.
 */
export function createSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      perfil TEXT NOT NULL,
      ativo INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT,
      ativo INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS veiculos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      placa TEXT NOT NULL UNIQUE,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      ano INTEGER,
      observacao TEXT,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    );

    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      veiculo_id INTEGER NOT NULL,
      data_hora TEXT NOT NULL,
      motivo TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'AGENDADO',
      FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
    );

    CREATE TABLE IF NOT EXISTS ordens_servico (
      numero INTEGER PRIMARY KEY AUTOINCREMENT,
      veiculo_id INTEGER NOT NULL,
      data_abertura TEXT NOT NULL,
      data_fechamento TEXT,
      status TEXT NOT NULL,
      quilometragem INTEGER NOT NULL DEFAULT 0,
      relato TEXT NOT NULL,
      diagnostico TEXT,
      total REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
    );

    CREATE TABLE IF NOT EXISTS itens_servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      os_numero INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      quantidade REAL NOT NULL,
      valor_unitario REAL NOT NULL,
      FOREIGN KEY (os_numero) REFERENCES ordens_servico(numero)
    );

    CREATE TABLE IF NOT EXISTS pecas (
      codigo TEXT PRIMARY KEY,
      descricao TEXT NOT NULL,
      estoque REAL NOT NULL DEFAULT 0,
      valor_unitario REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pecas_utilizadas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      os_numero INTEGER NOT NULL,
      peca_codigo TEXT NOT NULL,
      quantidade REAL NOT NULL,
      valor_unitario REAL NOT NULL,
      FOREIGN KEY (os_numero) REFERENCES ordens_servico(numero),
      FOREIGN KEY (peca_codigo) REFERENCES pecas(codigo)
    );

    CREATE TABLE IF NOT EXISTS auditoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      data_hora TEXT NOT NULL,
      entidade TEXT NOT NULL,
      identificador TEXT NOT NULL,
      operacao TEXT NOT NULL,
      detalhe TEXT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `);
  // Migração aditiva: mantém o banco utilizado nas aulas anteriores.
  const add = (table, column, definition) => {
    if (!db.prepare(`PRAGMA table_info(${table})`).all().some(c => c.name === column)) {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
  };
  add("ordens_servico", "mecanico_id", "INTEGER REFERENCES usuarios(id)");
  add("agendamentos", "os_numero", "INTEGER REFERENCES ordens_servico(numero)");
  add("pecas", "estoque_minimo", "REAL NOT NULL DEFAULT 5");
  db.exec(`CREATE INDEX IF NOT EXISTS idx_os_status ON ordens_servico(status);
    CREATE INDEX IF NOT EXISTS idx_os_veiculo ON ordens_servico(veiculo_id);
    CREATE INDEX IF NOT EXISTS idx_agenda_data ON agendamentos(data_hora);
    CREATE INDEX IF NOT EXISTS idx_auditoria_data ON auditoria(data_hora);`);
}
