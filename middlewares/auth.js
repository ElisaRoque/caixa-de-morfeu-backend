const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Autorização necessária.');
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    const authError = new Error('Token inválido.');
    authError.statusCode = 401;
    return next(authError);
  }
};

module.exports = auth;
