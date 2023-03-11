const mongoose = require("mongoose");

const MONGODB_CONNECTION = (MONGODB_URI) => {
  mongoose.set("strictQuery", false);

  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database");
  });

  mongoose.connection.on("error", () => {
    console.log("Connection to database failed");
    console.log(error);
  });
};

module.exports = MONGODB_CONNECTION;
