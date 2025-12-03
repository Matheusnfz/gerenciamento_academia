require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const logMiddleware = require('./middlewares/logMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const planoRoutes = require('./routes/planoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const exercicioRoutes = require('./routes/exercicioRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
const presencaRoutes = require('./routes/presencaRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/academia';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

connectDB(MONGO_URI);

// middlewares
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));
app.use(logMiddleware);

// routes
app.get('/', (req, res) => res.json({ ok: true, projeto: 'Gerenciamento Academia API' }));
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/planos', planoRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/exercicios', exercicioRoutes);
app.use('/api/treinos', treinoRoutes);
app.use('/api/presencas', presencaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);

// error handler (deve ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
