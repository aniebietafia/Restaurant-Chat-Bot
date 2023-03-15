const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const { config } = require("./setup");

const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 10,
  },
});

module.exports = sessionMiddleware;
