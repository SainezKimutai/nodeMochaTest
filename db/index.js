const mongoose = require('mongoose');
const config = require('../config');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

// make database connection
function connect() {
  return new Promise((resolve, reject) => {
    // make the actual connection
    mongoose.connect(config.mongo.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        .then(() =>{ console.log('Database Connected...'); resolve()})
        .catch((err) =>{ console.log('Database Not Connected!!'); resolve(err)});

  })
}


// Close database connection
function close() {
  return new Promise((resolve, reject) => {
    mongoose.disconnect();
    resolve()
  })
}





module.exports = { connect, close }
