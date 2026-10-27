const { errorLogger } = require('../utils/logger');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let { statusCode } = err;
  let { message } = err;

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Este e-mail já está cadastrado.';
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
    message = 'Dados inválidos.';
  } else if (
    !Number.isInteger(statusCode)
    || statusCode < 400
    || statusCode > 599
  ) {
    statusCode = 500;
  }

  errorLogger.error({
    message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode,
  });

  const messages = {
    400: message || 'Dados inválidos.',
    401: message || 'Autenticação necessária.',
    403: message || 'Acesso proibido.',
    404: message || 'Recurso não encontrado.',
    409: message || 'Conflito de dados.',
  };

  res.status(statusCode).json({
    message:
      statusCode >= 500
        ? 'Ocorreu um erro interno no servidor.'
        : messages[statusCode] || 'Não foi possível concluir a solicitação.',
  });

  return undefined;
}

module.exports = errorHandler;
