const { requestLogger, errorLogger } = require('../utils/logger');

function logRequests(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const logEntry = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: Date.now() - startTime,
    };

    requestLogger.info(logEntry);

    if (res.statusCode >= 400) {
      errorLogger.error(logEntry);
    }
  });

  next();
}

module.exports = logRequests;
