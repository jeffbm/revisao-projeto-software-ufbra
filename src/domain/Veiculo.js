export class Veiculo {
  constructor({
    id = null,
    clienteId,
    placa,
    marca,
    modelo,
    ano = null,
    observacao = null
  }) {
    if (!clienteId) throw new Error("Veículo deve pertencer a um cliente.");
    if (!placa?.trim()) throw new Error("Placa é obrigatória.");
    if (!marca?.trim()) throw new Error("Marca é obrigatória.");
    if (!modelo?.trim()) throw new Error("Modelo é obrigatório.");

    this.id = id;
    this.clienteId = Number(clienteId);
    this.placa = placa.trim().toUpperCase();
    this.marca = marca.trim();
    this.modelo = modelo.trim();
    this.ano = ano ? Number(ano) : null;
    this.observacao = observacao?.trim() || null;
  }
}
