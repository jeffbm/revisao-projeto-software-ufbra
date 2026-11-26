import test from "node:test";
import assert from "node:assert/strict";
import { OSService } from "../services/OSService.js";
import { Perfis } from "../config/constants.js";

/**
 * Teste de autorização com doubles simples.
 * Não precisamos de banco para verificar a regra RN07.
 */
test("CT19 - não gerente não pode reabrir OS", () => {
  const fakeOSRepo = {};
  const fakeVeiculoRepo = {};
  const fakeAuditoria = {};

  const service = new OSService(fakeOSRepo, fakeVeiculoRepo, fakeAuditoria);

  assert.throws(
    () => service.reabrir(
      1,
      "Correção administrativa",
      { id: 1, perfil: Perfis.ATENDENTE }
    ),
    /apenas para gerente/
  );
});
