const Pagamento = require('../models/Pagamento');

exports.create = async (req, res, next) => {
  try {
    const p = new Pagamento(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const itens = await Pagamento.find().populate('matricula');
    res.json(itens);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const p = await Pagamento.findById(req.params.id).populate('matricula');
    if (!p) return res.status(404).json({ message: 'Pagamento não encontrado' });
    res.json(p);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Pagamento.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};
