const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const { config } = require("./config");

//Configure redis client
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function () {
  console.log("Connected to redis successfully");
});

const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  //   store: new RedisStore({
  //     client: redisClient,
  //     prefix: "chabot:",
  //   }),
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 10,
  },
});

module.exports = sessionMiddleware;
