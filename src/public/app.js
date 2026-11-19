let token = null;

function headers() {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...headers(), ...(options.headers || {}) }
  });

  const body = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(body?.erro || "Erro na requisição");
  }

  return body;
}

function mostrar(valor) {
  document.querySelector("#saida").textContent =
    JSON.stringify(valor, null, 2);
}

async function entrar() {
  try {
    const sessao = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        login: document.querySelector("#loginUser").value,
        senha: document.querySelector("#loginPass").value
      })
    });

    token = sessao.token;
    document.querySelector("#sessao").textContent =
      `Autenticado como ${sessao.usuario.login} (${sessao.usuario.perfil})`;
    mostrar(sessao.usuario);
  } catch (e) {
    mostrar({ erro: e.message });
  }
}

async function criarCliente() {
  try {
    mostrar(await api("/api/clientes", {
      method: "POST",
      body: JSON.stringify({
        nome: document.querySelector("#clienteNome").value,
        telefone: document.querySelector("#clienteTelefone").value,
        email: document.querySelector("#clienteEmail").value
      })
    }));
  } catch (e) {
    mostrar({ erro: e.message });
  }
}

async function criarVeiculo() {
  try {
    mostrar(await api("/api/veiculos", {
      method: "POST",
      body: JSON.stringify({
        clienteId: Number(document.querySelector("#veiculoClienteId").value),
        placa: document.querySelector("#veiculoPlaca").value,
        marca: document.querySelector("#veiculoMarca").value,
        modelo: document.querySelector("#veiculoModelo").value
      })
    }));
  } catch (e) {
    mostrar({ erro: e.message });
  }
}

async function abrirOS() {
  try {
    mostrar(await api("/api/os", {
      method: "POST",
      body: JSON.stringify({
        veiculoId: Number(document.querySelector("#osVeiculoId").value),
        quilometragem: Number(document.querySelector("#osKm").value),
        relato: document.querySelector("#osRelato").value
      })
    }));
  } catch (e) {
    mostrar({ erro: e.message });
  }
}

async function carregarTudo() {
  try {
    const [clientes, veiculos, ordens, pecas] = await Promise.all([
      api("/api/clientes"),
      api("/api/veiculos"),
      api("/api/os"),
      api("/api/pecas")
    ]);

    mostrar({ clientes, veiculos, ordens, pecas });
  } catch (e) {
    mostrar({ erro: e.message });
  }
}
