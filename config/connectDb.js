const mongoose = require("mongoose");
const colors = require("colors");

mongoose.set("strictQuery", true);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: , // Increase timeout to 5 seconds
    });
    console.log(`Mongo connected On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;