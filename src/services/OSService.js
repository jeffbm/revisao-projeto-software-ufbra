import { OrdemServico } from "../domain/OrdemServico.js";
import { Perfis } from "../config/constants.js";

export class OSService {
  constructor(osRepository, veiculoRepository, auditoriaService) {
    this.ordens = osRepository;
    this.veiculos = veiculoRepository;
    this.auditoria = auditoriaService;
  }

  abrir({ veiculoId, quilometragem, relato }, usuario) {
    // RN01: só abre para veículo existente.
    if (!this.veiculos.buscarPorId(Number(veiculoId))) {
      throw new Error("Veículo não encontrado.");
    }

    const os = new OrdemServico({
      veiculoId: Number(veiculoId),
      quilometragem: Number(quilometragem || 0),
      relato
    });

    const salva = this.ordens.criar(os); // RN02: número único é gerado pelo banco.
    this.auditoria.registrar(usuario, "ORDEM_SERVICO", salva.numero, "ABRIR");

    return salva;
  }

  registrarDiagnostico(numero, diagnostico, usuario) {
    const os = this.#obter(numero);
    os.registrarDiagnostico(diagnostico);
    this.ordens.salvar(os);

    this.auditoria.registrar(usuario, "ORDEM_SERVICO", numero, "DIAGNOSTICO");
    return this.#obter(numero);
  }

  adicionarServico(numero, dados, usuario) {
    const os = this.#obter(numero);
    os.adicionarServico(dados);

    const item = os.servicos.at(-1);
    this.ordens.adicionarServico(numero, item);
    this.ordens.salvar(os);

    this.auditoria.registrar(usuario, "ORDEM_SERVICO", numero, "ADICIONAR_SERVICO");
    return this.#obter(numero);
  }

  fechar(numero, usuario) {
    const os = this.#obter(numero);
    os.fechar(); // RN06 + RN12
    this.ordens.salvar(os);

    this.auditoria.registrar(usuario, "ORDEM_SERVICO", numero, "FECHAR");
    return this.#obter(numero);
  }

  reabrir(numero, justificativa, usuario) {
    // RN07 e RN08
    this.#exigirGerente(usuario);

    if (!justificativa?.trim()) {
      throw new Error("Justificativa é obrigatória.");
    }

    const os = this.#obter(numero);
    os.reabrir();
    this.ordens.salvar(os);

    this.auditoria.registrar(
      usuario,
      "ORDEM_SERVICO",
      numero,
      "REABRIR",
      justificativa.trim()
    );

    return this.#obter(numero);
  }

  cancelar(numero, usuario) {
    this.#exigirGerente(usuario); // RN07

    const os = this.#obter(numero);
    os.cancelar();
    this.ordens.salvar(os);

    this.auditoria.registrar(usuario, "ORDEM_SERVICO", numero, "CANCELAR");
    return this.#obter(numero);
  }

  listar() {
    return this.ordens.listar();
  }

  historico(veiculoId) {
    return this.ordens.historicoVeiculo(Number(veiculoId));
  }

  #obter(numero) {
    const os = this.ordens.buscar(Number(numero));
    if (!os) throw new Error("OS não encontrada.");
    return os;
  }

  #exigirGerente(usuario) {
    if (usuario?.perfil !== Perfis.GERENTE) {
      throw new Error("Operação permitida apenas para gerente.");
    }
  }
}
