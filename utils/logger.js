const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDirectory = path.join(__dirname, "..", "logs");

fs.mkdirSync(logDirectory, { recursive: true });

const requestLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "request.log"),
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
    }),
  ],
});

module.exports = { requestLogger, errorLogger };
