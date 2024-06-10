const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const opts = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
  };

  try {
    cachedDb = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log('Connected to MongoDB with Mongoose!');
    return cachedDb;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

module.exports = { mongoose, connectToDatabase };
