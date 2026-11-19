/**
 * Coordena RN04 e RN05:
 * - registrar a peça na OS;
 * - baixar estoque na mesma operação lógica.
 */
export class EstoqueService {
  constructor(db, pecaRepository, osRepository, auditoriaService) {
    this.db = db;
    this.pecas = pecaRepository;
    this.ordens = osRepository;
    this.auditoria = auditoriaService;
  }

  registrarPecaNaOS(osNumero, codigo, quantidade, usuario) {
    const os = this.ordens.buscar(osNumero);
    if (!os) throw new Error("OS não encontrada.");
    os.assertEditavel();

    const peca = this.pecas.buscar(codigo);
    if (!peca) throw new Error("Peça não encontrada.");

    const qtd = Number(quantidade);

    // A transação garante RNF08: nada deve ficar parcialmente gravado.
    this.db.exec("BEGIN");

    try {
      peca.baixar(qtd); // RN05

      const item = {
        codigo: peca.codigo,
        descricao: peca.descricao,
        quantidade: qtd,
        valorUnitario: peca.valorUnitario
      };

      this.ordens.adicionarPeca(osNumero, item);
      this.pecas.salvar(peca);

      this.db.exec("COMMIT");

      this.auditoria.registrar(
        usuario,
        "ORDEM_SERVICO",
        osNumero,
        "ADICIONAR_PECA",
        `${codigo} x ${qtd}`
      );

      return this.ordens.buscar(osNumero);
    } catch (erro) {
      this.db.exec("ROLLBACK");
      throw erro;
    }
  }
}
