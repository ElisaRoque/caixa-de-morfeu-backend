const Dream = require('../models/dreams');

const getDreams = (req, res) => Dream.find({ owner: req.user._id })
  .sort({ date: -1 })
  .then((dreams) => res.send(dreams))
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: 'Erro interno do servidor.',
    });
  });

const createDream = (req, res) => {
  const {
    date, description, symbol, recurring,
  } = req.body;

  return Dream.create({
    owner: req.user._id,
    date,
    description,
    symbol,
    recurring,
  })
    .then((dream) => res.status(201).send(dream))
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados inválidos.',
        });
      }

      return res.status(500).send({
        message: 'Erro interno do servidor.',
      });
    });
};

const updateDream = (req, res) => {
  const { dreamId } = req.params;

  return Dream.findOneAndUpdate(
    {
      _id: dreamId,
      owner: req.user._id,
    },
    {
      ...(req.body.date !== undefined && { date: req.body.date }),
      ...(req.body.description !== undefined && {
        description: req.body.description,
      }),
      ...(req.body.symbol !== undefined && { symbol: req.body.symbol }),
      ...(req.body.recurring !== undefined && {
        recurring: req.body.recurring,
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((dream) => {
      if (!dream) {
        return res.status(404).send({
          message: 'Sonho não encontrado.',
        });
      }

      return res.send(dream);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Dados inválidos.',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID do sonho inválido.',
        });
      }

      return res.status(500).send({
        message: 'Erro interno do servidor.',
      });
    });
};

const deleteDream = (req, res) => {
  const { dreamId } = req.params;

  return Dream.findOneAndDelete({
    _id: dreamId,
    owner: req.user._id,
  })
    .then((dream) => {
      if (!dream) {
        return res.status(404).send({
          message: 'Sonho não encontrado.',
        });
      }

      return res.send(dream);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID do sonho inválido.',
        });
      }

      return res.status(500).send({
        message: 'Erro interno do servidor.',
      });
    });
};

module.exports = {
  getDreams,
  createDream,
  updateDream,
  deleteDream,
};
