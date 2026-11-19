import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * RNF09 — senha nunca é armazenada em texto puro.
 *
 * Formato gravado:
 * salt:hash
 */
export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedValue) {
  const [salt, storedHash] = storedValue.split(":");
  if (!salt || !storedHash) return false;

  const derived = scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, "hex");

  return stored.length === derived.length &&
    timingSafeEqual(stored, derived);
}
