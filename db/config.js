const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CNN);
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error on db initialization");
  }
};

module.exports = {
  dbConnection,
};
