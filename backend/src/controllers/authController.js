const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
};

exports.register = async (req, res, next) => {
  try {
    const { nome, email, senha, role } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ message: 'Campos faltando' });

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'Email já cadastrado' });

    user = new User({ nome, email, senha, role });
    await user.save();

    const token = generateToken(user);
    return res.status(201).json({ token, user: { id: user._id, nome: user.nome, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'Campos faltando' });

    const user = await User.findOne({ email }).select('+senha');
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const isMatch = await user.matchPassword(senha);
    if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = generateToken(user);
    return res.json({ token, user: { id: user._id, nome: user.nome, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};
