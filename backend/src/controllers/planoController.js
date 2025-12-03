const Plano = require('../models/Plano');

exports.create = async (req, res, next) => {
  try {
    const plano = new Plano(req.body);
    await plano.save();
    res.status(201).json(plano);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const planos = await Plano.find();
    res.json(planos);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const plano = await Plano.findById(req.params.id);
    if (!plano) return res.status(404).json({ message: 'Plano não encontrado' });
    res.json(plano);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const plano = await Plano.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plano) return res.status(404).json({ message: 'Plano não encontrado' });
    res.json(plano);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Plano.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
