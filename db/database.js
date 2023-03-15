const mongoose = require("mongoose");
const { config } = require("../config/setup");
require("dotenv").config();

function mongodb_connection(server) {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.local_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // dbName: config.db_name,
    })
    .then(() =>
      server.listen(config.PORT, () => {
        console.log(`server running at http://localhost:${config.PORT}`);
        console.log("Connection to mongodb successful");
      })
    )
    .catch((err) => console.log(err));
}

module.exports = mongodb_connection;
