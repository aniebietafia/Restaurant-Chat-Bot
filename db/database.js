const mongoose = require("mongoose");

const mongodb_connection = (MONGODB_URL) => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("Failed to connect to database");
      console.log(err);
    });
};

module.exports = mongodb_connection;
