/**
 * Entidade Cliente.
 *
 * O domínio guarda regras simples que independem de banco ou HTTP.
 */
export class Cliente {
  constructor({ id = null, nome, telefone, email = null, ativo = true }) {
    if (!nome?.trim()) throw new Error("Nome do cliente é obrigatório.");
    if (!telefone?.trim()) throw new Error("Telefone do cliente é obrigatório.");

    this.id = id;
    this.nome = nome.trim();
    this.telefone = telefone.trim();
    this.email = email?.trim() || null;
    this.ativo = Boolean(ativo);
  }
}
