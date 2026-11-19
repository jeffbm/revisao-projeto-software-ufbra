import { Cliente } from "../domain/Cliente.js";

export class ClienteService {
  constructor(clienteRepository, auditoriaService) {
    this.repository = clienteRepository;
    this.auditoria = auditoriaService;
  }

  criar(dados, usuario) {
    const cliente = new Cliente(dados);
    const salvo = this.repository.criar(cliente);

    this.auditoria.registrar(usuario, "CLIENTE", salvo.id, "CRIAR");
    return salvo;
  }

  listar() {
    return this.repository.listar();
  }
}
