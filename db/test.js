const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();


const connect = () => {
  return new Promise( async(resolve, reject) => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};
    await mongoose.connect(uri, mongooseOpts);
    resolve()
  })
}


const clear = async () => {
    return new Promise( async(resolve, reject) => {
    const collections = mongoose.connection.collections;


    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
    resolve()
  })
}


const close = async () => {
    return new Promise( async(resolve, reject) => {
      await mongoose.connection.close();
      await mongod.stop();
      await mongoose.disconnect();
      resolve()
    })
}


module.exports = { connect, clear, close }
