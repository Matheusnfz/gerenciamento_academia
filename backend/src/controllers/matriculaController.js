const Matricula = require('../models/Matricula');

exports.create = async (req, res, next) => {
  try {
    const matricula = new Matricula(req.body);
    await matricula.save();
    res.status(201).json(matricula);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const lista = await Matricula.find().populate('aluno plano');
    res.json(lista);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const matricula = await Matricula.findById(req.params.id).populate('aluno plano');
    if (!matricula) return res.status(404).json({ message: 'Matrícula não encontrada' });
    res.json(matricula);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const matricula = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!matricula) return res.status(404).json({ message: 'Matrícula não encontrada' });
    res.json(matricula);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Matricula.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
