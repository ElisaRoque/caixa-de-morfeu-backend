const { errorLogger } = require("../utils/logger");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode;

  if (err.code === 11000) {
    statusCode = 409;
    err.message = "Este e-mail já está cadastrado.";
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
    err.message = "Dados inválidos.";
  } else if (
    !Number.isInteger(statusCode) ||
    statusCode < 400 ||
    statusCode > 599
  ) {
    statusCode = 500;
  }

  errorLogger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode,
  });

  const messages = {
    400: err.message || "Dados inválidos.",
    401: err.message || "Autenticação necessária.",
    403: err.message || "Acesso proibido.",
    404: err.message || "Recurso não encontrado.",
    409: err.message || "Conflito de dados.",
  };

  res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Ocorreu um erro interno no servidor."
        : messages[statusCode] || "Não foi possível concluir a solicitação.",
  });
}

module.exports = errorHandler;
