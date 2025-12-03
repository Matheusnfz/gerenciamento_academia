const mongoose = require('mongoose');

const TreinoSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  instrutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercicios: [{
    exercicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercicio' },
    series: Number,
    repeticoes: Number,
    cargaKg: Number,
    observacao: String
  }],
  diasSemana: [String],
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Treino', TreinoSchema);
