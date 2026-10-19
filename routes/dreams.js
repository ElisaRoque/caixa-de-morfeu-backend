const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");

const {
  getDreams,
  createDream,
  deleteDream,
} = require("../controllers/dreams");

const auth = require("../middlewares/auth");

router.get("/dreams", auth, getDreams);

router.post(
  "/dreams",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.date().iso().required().messages({
        "date.base": "Informe uma data válida.",
        "any.required": "A data do sonho é obrigatória.",
      }),

      description: Joi.string().trim().required().messages({
        "string.empty": "A descrição do sonho é obrigatória.",
        "any.required": "A descrição do sonho é obrigatória.",
      }),

      symbol: Joi.object({
        name: Joi.string().trim().required().messages({
          "string.empty": "O nome do símbolo é obrigatório.",
          "any.required": "O nome do símbolo é obrigatório.",
        }),

        slug: Joi.string().trim().required().messages({
          "string.empty": "O identificador do símbolo é obrigatório.",
          "any.required": "O identificador do símbolo é obrigatório.",
        }),
      })
        .required()
        .unknown(false),

      recurring: Joi.boolean().default(false),
    }).unknown(false),
  }),
  createDream,
);

router.delete(
  "/dreams/:dreamId",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      dreamId: Joi.string().hex().length(24).required().messages({
        "string.hex": "O ID do sonho é inválido.",
        "string.length": "O ID do sonho é inválido.",
        "any.required": "O ID do sonho é obrigatório.",
      }),
    }),
  }),
  deleteDream,
);

module.exports = router;
