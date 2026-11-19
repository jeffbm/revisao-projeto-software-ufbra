export class AuditoriaService {
  constructor(auditoriaRepository) {
    this.repository = auditoriaRepository;
  }

  registrar(usuario, entidade, identificador, operacao, detalhe = null) {
    if (!usuario?.id) return;

    this.repository.registrar({
      usuarioId: usuario.id,
      entidade,
      identificador,
      operacao,
      detalhe
    });
  }
}
