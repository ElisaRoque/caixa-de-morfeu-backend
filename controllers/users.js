const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        email,
        password: hashedPassword,
      }),
    )
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(409).send({
          message: "Este e-mail já está cadastrado.",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Dados inválidos.",
        });
      }

      return res.status(500).send({
        message: "Erro interno do servidor.",
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "E-mail ou senha incorretos.",
        });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).send({
            message: "E-mail ou senha incorretos.",
          });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        return res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: "Erro interno do servidor.",
      });
    });
};

const getCurrentUser = (req, res) => {
  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Usuário não encontrado.",
        });
      }

      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: "Erro interno do servidor.",
      });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
