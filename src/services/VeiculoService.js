import { Veiculo } from "../domain/Veiculo.js";

export class VeiculoService {
  constructor(veiculoRepository, clienteRepository, auditoriaService) {
    this.veiculos = veiculoRepository;
    this.clientes = clienteRepository;
    this.auditoria = auditoriaService;
  }

  criar(dados, usuario) {
    const cliente = this.clientes.buscarPorId(Number(dados.clienteId));

    // RN10: veículo pertence a cliente ativo.
    if (!cliente || !cliente.ativo) {
      throw new Error("Cliente inexistente ou inativo.");
    }

    const veiculo = new Veiculo(dados);
    const salvo = this.veiculos.criar(veiculo);

    this.auditoria.registrar(usuario, "VEICULO", salvo.id, "CRIAR", salvo.placa);
    return salvo;
  }

  listar() {
    return this.veiculos.listar();
  }
}
