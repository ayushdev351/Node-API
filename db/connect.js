const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url).then(() => console.log('Db connected.....'));
}

module.exports = connectDB;
