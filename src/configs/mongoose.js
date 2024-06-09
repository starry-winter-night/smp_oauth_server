const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

mongoose
  .connect(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log('Connected to MongoDB with Mongoose!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
module.exports = mongoose;
