const mongoose = require('mongoose');

const PlanoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  duracaoMeses: { type: Number, default: 1 },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plano', PlanoSchema);
