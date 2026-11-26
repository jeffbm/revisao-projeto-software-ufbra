/** Consultas compostas e operações administrativas do incremento 2. */
export class GestaoRepository {
  constructor(db) { this.db = db; }
  todos(sql, ...args) { return this.db.prepare(sql).all(...args); }
  um(sql, ...args) { return this.db.prepare(sql).get(...args); }
  executar(sql, ...args) { return this.db.prepare(sql).run(...args); }
  ordens() {
    return this.todos(`SELECT o.numero, o.veiculo_id AS veiculoId, o.status, o.relato, o.diagnostico,
      o.quilometragem, o.data_abertura AS dataAbertura, o.data_fechamento AS dataFechamento,
      o.mecanico_id AS mecanicoId, u.login AS mecanico, v.placa, v.marca, v.modelo,
      c.nome AS clienteNome, c.id AS clienteId,
      ROUND(COALESCE((SELECT SUM(quantidade*valor_unitario) FROM itens_servico WHERE os_numero=o.numero),0)
        + COALESCE((SELECT SUM(quantidade*valor_unitario) FROM pecas_utilizadas WHERE os_numero=o.numero),0),2) AS total
      FROM ordens_servico o JOIN veiculos v ON v.id=o.veiculo_id JOIN clientes c ON c.id=v.cliente_id
      LEFT JOIN usuarios u ON u.id=o.mecanico_id ORDER BY o.numero DESC`);
  }
  pecas() { return this.todos('SELECT codigo, descricao, estoque, valor_unitario AS valorUnitario, estoque_minimo AS estoqueMinimo FROM pecas ORDER BY descricao'); }
  usuarios() { return this.todos('SELECT id, login, perfil, ativo FROM usuarios ORDER BY login'); }
  auditoria() { return this.todos(`SELECT a.id,a.data_hora AS dataHora,a.entidade,a.identificador,a.operacao,a.detalhe,u.login FROM auditoria a JOIN usuarios u ON u.id=a.usuario_id ORDER BY a.id DESC LIMIT 500`); }
  agenda() { return this.todos(`SELECT a.id,a.veiculo_id AS veiculoId,a.data_hora AS dataHora,a.motivo,a.status,a.os_numero AS osNumero,v.placa,v.modelo,c.nome AS clienteNome FROM agendamentos a JOIN veiculos v ON v.id=a.veiculo_id JOIN clientes c ON c.id=v.cliente_id ORDER BY a.data_hora`); }
}
