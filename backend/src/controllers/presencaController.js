const Presenca = require('../models/Presenca');

exports.create = async (req, res, next) => {
  try {
    const p = new Presenca(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const itens = await Presenca.find().populate('aluno');
    res.json(itens);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const p = await Presenca.findById(req.params.id).populate('aluno');
    if (!p) return res.status(404).json({ message: 'Presença não encontrada' });
    res.json(p);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Presenca.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
