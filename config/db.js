const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect("mongodb://localhost:27017/caixa-de-morfeu");
};

module.exports = connectDB;
