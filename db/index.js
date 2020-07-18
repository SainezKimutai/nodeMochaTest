const mongoose = require('mongoose');
const config = require('../config');


// make database connection
function connect() {
  return new Promise((resolve, reject) => {

    // if the conection request if for test purpose, create a virtual db connection using Mockgoose
    if (process.env.NODE_ENV === 'test') {

      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(config.mongo.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
              .then(() =>{ console.log('Database Connected...'); resolve()})
              .catch((err) =>{ console.log('Database Not Connected!!'); resolve(err)});
        })
        .catch((err) => console.log(err))


    } else {
      // make the actual connection
      mongoose.connect(config.mongo.url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
          .then(() =>{ console.log('Database Connected...'); resolve()})
          .catch((err) =>{ console.log('Database Not Connected!!'); resolve(err)});
    }
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
