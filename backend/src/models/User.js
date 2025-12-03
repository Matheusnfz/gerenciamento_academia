const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin','instrutor','recepcao'], default: 'recepcao' },
  criadoEm: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

UserSchema.methods.matchPassword = async function(plainPass) {
  return await bcrypt.compare(plainPass, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
