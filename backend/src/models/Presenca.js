const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  data: { type: Date, required: true },
  horario: { type: String },
  tipo: { type: String, enum: ['entrada','saida'], default: 'entrada' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Presenca', PresencaSchema);
