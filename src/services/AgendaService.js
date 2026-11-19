export class AgendaService {
  constructor(agendamentoRepository, veiculoRepository, auditoriaService) {
    this.agendamentos = agendamentoRepository;
    this.veiculos = veiculoRepository;
    this.auditoria = auditoriaService;
  }

  agendar({ veiculoId, dataHora, motivo }, usuario) {
    if (!veiculoId || !dataHora || !motivo?.trim()) {
      throw new Error("Veículo, data/hora e motivo são obrigatórios."); // RN11
    }

    if (!this.veiculos.buscarPorId(Number(veiculoId))) {
      throw new Error("Veículo não encontrado.");
    }

    if (this.agendamentos.existeConflito(dataHora)) {
      throw new Error("Já existe atendimento nesse horário.");
    }

    const agendamento = this.agendamentos.criar({
      veiculoId: Number(veiculoId),
      dataHora,
      motivo: motivo.trim()
    });

    this.auditoria.registrar(usuario, "AGENDAMENTO", agendamento.id, "CRIAR");
    return agendamento;
  }

  listar() {
    return this.agendamentos.listar();
  }
}
