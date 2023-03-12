const config_settings = {
  BOTNAME: process.env.BOTNAME,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SESSIONSECRET: process.env.SESSIONSECRET,
  LOCALDB: process.env.LOCALDB,
  DBNAME: process.env.BOTNAME,
  SESSIONDURATION: process.env.SESSIONDURATION,
};

const cors = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const express_session = require("express-session");

const duration = Number(config_settings.SESSIONDURATION);

const sessionMiddleware = express_session({
  secret: config_settings.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, duration },
});

module.exports = {
  sessionMiddleware,
  cors,
  config_settings,
};
