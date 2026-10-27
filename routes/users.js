const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { createUser, login, getCurrentUser } = require('../controllers/users');

const auth = require('../middlewares/auth');

router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().trim().min(2).max(30)
        .required()
        .messages({
          'string.empty': 'O nome é obrigatório.',
          'string.min': 'O nome deve ter pelo menos 2 caracteres.',
          'string.max': 'O nome deve ter no máximo 30 caracteres.',
          'any.required': 'O nome é obrigatório.',
        }),
      email: Joi.string().trim().email().required()
        .messages({
          'string.email': 'Informe um e-mail válido.',
          'string.empty': 'O e-mail é obrigatório.',
          'any.required': 'O e-mail é obrigatório.',
        }),
      password: Joi.string().required().messages({
        'string.empty': 'A senha é obrigatória.',
        'any.required': 'A senha é obrigatória.',
      }),
    }).unknown(false),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().trim().email().required()
        .messages({
          'string.email': 'Informe um e-mail válido.',
          'string.empty': 'O e-mail é obrigatório.',
          'any.required': 'O e-mail é obrigatório.',
        }),
      password: Joi.string().required().messages({
        'string.empty': 'A senha é obrigatória.',
        'any.required': 'A senha é obrigatória.',
      }),
    }).unknown(false),
  }),
  login,
);

router.get('/users/me', auth, getCurrentUser);

module.exports = router;
