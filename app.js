require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const dreamRoutes = require("./routes/dreams");
const logRequests = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logRequests);

app.use("/", userRoutes);
app.use("/", dreamRoutes);

// Rotas inexistentes
app.use((req, res, next) => {
  const err = new Error("Rota não encontrada.");
  err.statusCode = 404;
  next(err);
});

// Tratamento de erros do Celebrate
app.use(errors());

// Tratamento centralizado dos demais erros
app.use(errorHandler);

connectDB()
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
