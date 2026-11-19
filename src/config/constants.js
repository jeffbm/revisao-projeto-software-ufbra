/**
 * Constantes compartilhadas do sistema.
 *
 * Centralizar valores evita strings "mágicas" espalhadas pelo código.
 */

export const Perfis = Object.freeze({
  ATENDENTE: "ATENDENTE",
  MECANICO: "MECANICO",
  GERENTE: "GERENTE"
});

export const StatusOS = Object.freeze({
  ABERTA: "ABERTA",
  EM_DIAGNOSTICO: "EM_DIAGNOSTICO",
  EM_EXECUCAO: "EM_EXECUCAO",
  FECHADA: "FECHADA",
  CANCELADA: "CANCELADA"
});
