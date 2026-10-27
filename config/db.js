const mongoose = require('mongoose');

const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caixa-de-morfeu';

  return mongoose.connect(mongoUri);
};

module.exports = connectDB;
