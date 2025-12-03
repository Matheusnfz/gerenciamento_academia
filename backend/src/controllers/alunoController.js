const Aluno = require('../models/Aluno');

exports.create = async (req, res, next) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
