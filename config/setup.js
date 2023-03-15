const config = {
  botName: process.env.botName,
  PORT: process.env.PORT,
  sessionSecret: process.env.sessionSecret,
};

const cors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = { config, cors };
