import { OrdemServico } from "../domain/OrdemServico.js";

export class OSRepository {
  constructor(db) {
    this.db = db;
  }

  criar(os) {
    const result = this.db.prepare(`
      INSERT INTO ordens_servico
      (veiculo_id, data_abertura, status, quilometragem, relato, diagnostico, total)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      os.veiculoId,
      os.dataAbertura,
      os.status,
      os.quilometragem,
      os.relato,
      os.diagnostico,
      os.total
    );

    return this.buscar(Number(result.lastInsertRowid));
  }

  buscar(numero) {
    const row = this.db.prepare(`
      SELECT numero, veiculo_id AS veiculoId,
             data_abertura AS dataAbertura,
             data_fechamento AS dataFechamento,
             status, quilometragem, relato, diagnostico, total
      FROM ordens_servico
      WHERE numero = ?
    `).get(numero);

    if (!row) return null;

    const servicos = this.db.prepare(`
      SELECT descricao, quantidade, valor_unitario AS valorUnitario
      FROM itens_servico WHERE os_numero = ?
    `).all(numero);

    const pecas = this.db.prepare(`
      SELECT pu.peca_codigo AS codigo, p.descricao,
             pu.quantidade, pu.valor_unitario AS valorUnitario
      FROM pecas_utilizadas pu
      JOIN pecas p ON p.codigo = pu.peca_codigo
      WHERE pu.os_numero = ?
    `).all(numero);

    return new OrdemServico({ ...row, servicos, pecas });
  }

  salvar(os) {
    this.db.prepare(`
      UPDATE ordens_servico
      SET data_fechamento = ?, status = ?, diagnostico = ?, total = ?
      WHERE numero = ?
    `).run(os.dataFechamento, os.status, os.diagnostico, os.total, os.numero);
  }

  adicionarServico(osNumero, item) {
    this.db.prepare(`
      INSERT INTO itens_servico
      (os_numero, descricao, quantidade, valor_unitario)
      VALUES (?, ?, ?, ?)
    `).run(osNumero, item.descricao, item.quantidade, item.valorUnitario);
  }

  adicionarPeca(osNumero, item) {
    this.db.prepare(`
      INSERT INTO pecas_utilizadas
      (os_numero, peca_codigo, quantidade, valor_unitario)
      VALUES (?, ?, ?, ?)
    `).run(osNumero, item.codigo, item.quantidade, item.valorUnitario);
  }

  listar() {
    return this.db.prepare(`
      SELECT os.numero, os.status, os.data_abertura AS dataAbertura,
             os.data_fechamento AS dataFechamento, os.total,
             v.placa, v.marca, v.modelo
      FROM ordens_servico os
      JOIN veiculos v ON v.id = os.veiculo_id
      ORDER BY os.numero DESC
    `).all();
  }

  historicoVeiculo(veiculoId) {
    return this.db.prepare(`
      SELECT numero, data_abertura AS dataAbertura,
             data_fechamento AS dataFechamento, status, total,
             relato, diagnostico
      FROM ordens_servico
      WHERE veiculo_id = ?
      ORDER BY numero DESC
    `).all(veiculoId);
  }
}
