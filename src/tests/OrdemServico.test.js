import test from "node:test";
import assert from "node:assert/strict";
import { OrdemServico } from "../src/domain/OrdemServico.js";
import { StatusOS } from "../src/config/constants.js";

test("CT05 - nova OS inicia ABERTA", () => {
  const os = new OrdemServico({
    veiculoId: 1,
    relato: "Ruído na suspensão"
  });

  assert.equal(os.status, StatusOS.ABERTA);
});

test("CT09 - não permite fechar OS sem serviço", () => {
  const os = new OrdemServico({
    veiculoId: 1,
    relato: "Revisão"
  });

  assert.throws(
    () => os.fechar(),
    /sem serviço executado/
  );
});

test("RN12 - total soma serviços e peças", () => {
  const os = new OrdemServico({
    veiculoId: 1,
    relato: "Troca de óleo"
  });

  os.adicionarServico({
    descricao: "Mão de obra",
    quantidade: 1,
    valorUnitario: 100
  });

  os.adicionarPeca({
    codigo: "P001",
    descricao: "Filtro",
    quantidade: 1,
    valorUnitario: 35
  });

  assert.equal(os.calcularTotal(), 135);
});

test("fechar OS altera estado e calcula total", () => {
  const os = new OrdemServico({
    veiculoId: 1,
    relato: "Serviço"
  });

  os.adicionarServico({
    descricao: "Diagnóstico",
    quantidade: 1,
    valorUnitario: 80
  });

  os.fechar();

  assert.equal(os.status, StatusOS.FECHADA);
  assert.equal(os.total, 80);
  assert.ok(os.dataFechamento);
});
