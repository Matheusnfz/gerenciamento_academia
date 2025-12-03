const Exercicio = require('../models/Exercicio');

exports.create = async (req, res, next) => {
  try {
    const ex = new Exercicio(req.body);
    await ex.save();
    res.status(201).json(ex);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const itens = await Exercicio.find();
    res.json(itens);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const ex = await Exercicio.findById(req.params.id);
    if (!ex) return res.status(404).json({ message: 'Exercício não encontrado' });
    res.json(ex);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const ex = await Exercicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ex) return res.status(404).json({ message: 'Exercício não encontrado' });
    res.json(ex);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Exercicio.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
