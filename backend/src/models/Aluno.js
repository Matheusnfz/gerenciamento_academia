const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  email: { type: String },
  telefone: { type: String },
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    uf: String,
    cep: String
  },
  dataNascimento: Date,
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Aluno', AlunoSchema);
