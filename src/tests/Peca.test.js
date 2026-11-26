import test from "node:test";
import assert from "node:assert/strict";
import { Peca } from "../domain/Peca.js";

test("CT08 - impede baixa maior que estoque", () => {
  const peca = new Peca({
    codigo: "P001",
    descricao: "Filtro",
    estoque: 2,
    valorUnitario: 35
  });

  assert.throws(() => peca.baixar(3), /Estoque insuficiente/);
});

test("baixa válida reduz estoque", () => {
  const peca = new Peca({
    codigo: "P001",
    descricao: "Filtro",
    estoque: 10,
    valorUnitario: 35
  });

  peca.baixar(3);
  assert.equal(peca.estoque, 7);
});
