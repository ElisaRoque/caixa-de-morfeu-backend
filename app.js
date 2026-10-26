require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const dreamRoutes = require('./routes/dreams');
const logRequests = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://dream.zef.ro'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origem não permitida pelo CORS.'));
    },
  }),
);

app.use(express.json());
app.use(logRequests);

app.use('/', userRoutes);
app.use('/', dreamRoutes);

// Rotas inexistentes
app.use((req, res, next) => {
  const err = new Error('Rota não encontrada.');
  err.statusCode = 404;
  next(err);
});

// Tratamento de erros do Celebrate
app.use(errors());

// Tratamento centralizado dos demais erros
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    console.log('Conectado ao MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
