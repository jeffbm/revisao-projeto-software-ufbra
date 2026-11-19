import { randomUUID } from "node:crypto";
import { verifyPassword } from "../utils/password.js";

/**
 * Sessões em memória para manter o exemplo simples.
 *
 * Em produção, seria comum usar sessão persistente, JWT ou provedor externo.
 */
export class AutenticacaoService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
    this.sessions = new Map();
  }

  login(login, senha) {
    const usuario = this.usuarioRepository.buscarPorLogin(login);

    if (!usuario || !usuario.ativo || !verifyPassword(senha, usuario.senhaHash)) {
      throw new Error("Credenciais inválidas.");
    }

    const token = randomUUID();

    const sessao = {
      token,
      usuario: {
        id: usuario.id,
        login: usuario.login,
        perfil: usuario.perfil
      }
    };

    this.sessions.set(token, sessao);
    return sessao;
  }

  obterSessao(token) {
    return this.sessions.get(token) || null;
  }

  logout(token) {
    this.sessions.delete(token);
  }
}
