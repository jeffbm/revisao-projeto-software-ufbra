/**
 * Middleware de autenticação.
 *
 * O cliente envia:
 * Authorization: Bearer <token>
 */
export function authMiddleware(autenticacaoService) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    const sessao = token ? autenticacaoService.obterSessao(token) : null;

    if (!sessao) {
      return res.status(401).json({ erro: "Autenticação necessária." });
    }

    req.usuario = sessao.usuario;
    req.token = token;
    next();
  };
}
