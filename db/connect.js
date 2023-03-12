const mongoose = require("mongoose");
const { config_settings } = require("../middleware/session.middleware");

const mongodb_connection = (server) => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(config_settings.LOCALDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: config_settings.DBNAME,
    })
    .then(() =>
      server.listen(config_settings.PORT, () => {
        console.log(`Running on http://${config_settings.PORT} and successfully connected to database`);
      })
    )
    .catch((err) => console.log("connection failed", err));
};

module.exports = mongodb_connection;
