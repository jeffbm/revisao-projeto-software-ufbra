import { Router } from "express";

export function authRoutes(authService) {
  const router = Router();

  router.post("/login", (req, res) => {
    try {
      const sessao = authService.login(req.body.login, req.body.senha);
      res.json(sessao);
    } catch (erro) {
      res.status(401).json({ erro: erro.message });
    }
  });

  router.post("/logout", (req, res) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (token) authService.logout(token);
    res.status(204).end();
  });

  return router;
}
