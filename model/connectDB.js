const mongoose = require("mongoose");
const { config } = require("../config/config");

// function connectMongo(server) {
//   mongoose.set("strictQuery", false);
//   mongoose
//     .connect(config.local_db, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: config.db_name,
//     })
//     .then(() =>
//       server.listen(config.PORT, () => {
//         console.log(`App running at PORT: ${config.PORT} and MongoDB Server started`);
//       })
//     )
//     .catch((err) => console.log(err));
// }

function connectMongo(server) {
  mongoose.set("strictQuery", false);

  mongoose.connect(config.local_db);

  mongoose.connection.on("connect", () => {
    console.log("Connected to mongodb database");
  });

  mongoose.connection.on("error", () => {
    console.log("Failed to connect to database.");
  });
}

module.exports = connectMongo;
