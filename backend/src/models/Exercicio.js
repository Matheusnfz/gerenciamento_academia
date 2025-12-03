const mongoose = require('mongoose');

const ExercicioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  grupoMuscular: String,
  descricao: String,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercicio', ExercicioSchema);
