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
    if (typeof login !== "string" || typeof senha !== "string" || senha.length > 256) throw new Error("Credenciais inválidas.");
    const usuario = this.usuarioRepository.buscarPorLogin(login.trim());

    if (!usuario || !usuario.ativo || !verifyPassword(senha, usuario.senhaHash)) {
      throw new Error("Credenciais inválidas.");
    }

    const token = randomUUID();

    const sessao = {
      token,
      expiraEm: Date.now() + 8 * 60 * 60 * 1000,
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
    const sessao = this.sessions.get(token);
    if (!sessao || sessao.expiraEm <= Date.now()) { this.sessions.delete(token); return null; }
    const atual = this.usuarioRepository.buscarPorLogin(sessao.usuario.login);
    if (!atual?.ativo || atual.perfil !== sessao.usuario.perfil) { this.sessions.delete(token); return null; }
    return sessao;
  }

  revogarUsuario(id) {
    for (const [token, sessao] of this.sessions) if (sessao.usuario.id === id) this.sessions.delete(token);
  }

  logout(token) {
    this.sessions.delete(token);
  }
}
