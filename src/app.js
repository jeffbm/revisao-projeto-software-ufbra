import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createDatabase } from "./database/db.js";
import { createSchema } from "./database/schema.js";
import { seed } from "./database/seed.js";

import { ClienteRepository } from "./repositories/ClienteRepository.js";
import { VeiculoRepository } from "./repositories/VeiculoRepository.js";
import { UsuarioRepository } from "./repositories/UsuarioRepository.js";
import { AgendamentoRepository } from "./repositories/AgendamentoRepository.js";
import { PecaRepository } from "./repositories/PecaRepository.js";
import { OSRepository } from "./repositories/OSRepository.js";
import { AuditoriaRepository } from "./repositories/AuditoriaRepository.js";

import { AuditoriaService } from "./services/AuditoriaService.js";
import { AutenticacaoService } from "./services/AutenticacaoService.js";
import { ClienteService } from "./services/ClienteService.js";
import { VeiculoService } from "./services/VeiculoService.js";
import { AgendaService } from "./services/AgendaService.js";
import { EstoqueService } from "./services/EstoqueService.js";
import { OSService } from "./services/OSService.js";

import { authMiddleware } from "./middleware/auth.js";
import { authRoutes } from "./routes/authRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js";

/**
 * Composition Root.
 *
 * Aqui os objetos são criados e conectados.
 * Isso deixa as classes menores e facilita testes.
 */
export function createApp({ databaseFile = "./data/oficina-prime.db" } = {}) {
  const db = createDatabase(databaseFile);
  createSchema(db);
  seed(db);

  // Repositórios
  const clienteRepository = new ClienteRepository(db);
  const veiculoRepository = new VeiculoRepository(db);
  const usuarioRepository = new UsuarioRepository(db);
  const agendamentoRepository = new AgendamentoRepository(db);
  const pecaRepository = new PecaRepository(db);
  const osRepository = new OSRepository(db);
  const auditoriaRepository = new AuditoriaRepository(db);

  // Serviços
  const auditoriaService = new AuditoriaService(auditoriaRepository);
  const autenticacaoService = new AutenticacaoService(usuarioRepository);
  const clienteService = new ClienteService(clienteRepository, auditoriaService);
  const veiculoService = new VeiculoService(
    veiculoRepository,
    clienteRepository,
    auditoriaService
  );
  const agendaService = new AgendaService(
    agendamentoRepository,
    veiculoRepository,
    auditoriaService
  );
  const osService = new OSService(
    osRepository,
    veiculoRepository,
    auditoriaService
  );
  const estoqueService = new EstoqueService(
    db,
    pecaRepository,
    osRepository,
    auditoriaService
  );

  const app = express();
  app.use(express.json());

  // Rotas públicas de autenticação.
  app.use("/api/auth", authRoutes(autenticacaoService));

  // API protegida.
  app.use(
    "/api",
    authMiddleware(autenticacaoService),
    apiRoutes({
      clienteService,
      veiculoService,
      agendaService,
      osService,
      estoqueService,
      pecaRepository
    })
  );

  // Interface estática simples.
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", projeto: "Oficina Prime" });
  });

  return { app, db };
}
