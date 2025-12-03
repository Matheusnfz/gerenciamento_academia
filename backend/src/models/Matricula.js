const mongoose = require('mongoose');

const MatriculaSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  plano: { type: mongoose.Schema.Types.ObjectId, ref: 'Plano', required: true },
  dataInicio: { type: Date, required: true },
  dataFim: Date,
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Matricula', MatriculaSchema);
