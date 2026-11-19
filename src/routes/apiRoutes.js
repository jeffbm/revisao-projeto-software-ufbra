import { Router } from "express";

/**
 * As rotas não contêm as regras de negócio.
 * Elas recebem HTTP, chamam serviços e devolvem JSON.
 */
export function apiRoutes({
  clienteService,
  veiculoService,
  agendaService,
  osService,
  estoqueService,
  pecaRepository
}) {
  const router = Router();

  const safe = (handler) => async (req, res) => {
    try {
      const result = await handler(req, res);
      if (!res.headersSent) res.json(result);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  };

  router.get("/clientes", safe(() => clienteService.listar()));
  router.post("/clientes", safe(req => clienteService.criar(req.body, req.usuario)));

  router.get("/veiculos", safe(() => veiculoService.listar()));
  router.post("/veiculos", safe(req => veiculoService.criar(req.body, req.usuario)));

  router.get("/agenda", safe(() => agendaService.listar()));
  router.post("/agenda", safe(req => agendaService.agendar(req.body, req.usuario)));

  router.get("/pecas", safe(() => pecaRepository.listar()));

  router.get("/os", safe(() => osService.listar()));
  router.post("/os", safe(req => osService.abrir(req.body, req.usuario)));

  router.post("/os/:numero/diagnostico", safe(req =>
    osService.registrarDiagnostico(req.params.numero, req.body.diagnostico, req.usuario)
  ));

  router.post("/os/:numero/servicos", safe(req =>
    osService.adicionarServico(req.params.numero, req.body, req.usuario)
  ));

  router.post("/os/:numero/pecas", safe(req =>
    estoqueService.registrarPecaNaOS(
      Number(req.params.numero),
      req.body.codigo,
      req.body.quantidade,
      req.usuario
    )
  ));

  router.post("/os/:numero/fechar", safe(req =>
    osService.fechar(req.params.numero, req.usuario)
  ));

  router.post("/os/:numero/reabrir", safe(req =>
    osService.reabrir(req.params.numero, req.body.justificativa, req.usuario)
  ));

  router.post("/os/:numero/cancelar", safe(req =>
    osService.cancelar(req.params.numero, req.usuario)
  ));

  router.get("/veiculos/:id/historico", safe(req =>
    osService.historico(req.params.id)
  ));

  return router;
}
