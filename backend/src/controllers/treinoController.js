const Treino = require('../models/Treino');

exports.create = async (req, res, next) => {
  try {
    const t = new Treino(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const itens = await Treino.find().populate('aluno instrutor exercicios.exercicio');
    res.json(itens);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const t = await Treino.findById(req.params.id).populate('aluno instrutor exercicios.exercicio');
    if (!t) return res.status(404).json({ message: 'Treino não encontrado' });
    res.json(t);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const t = await Treino.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ message: 'Treino não encontrado' });
    res.json(t);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Treino.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
