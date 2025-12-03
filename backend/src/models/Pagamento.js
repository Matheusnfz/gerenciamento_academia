const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
  matricula: { type: mongoose.Schema.Types.ObjectId, ref: 'Matricula', required: true },
  valor: { type: Number, required: true },
  dataPagamento: { type: Date, required: true },
  metodo: { type: String, enum: ['pix','cartao','dinheiro','transferencia'], default: 'pix' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pagamento', PagamentoSchema);
