// Import node core modules and npm packages
const path = require("path");
const express = require("express");

const sessionMiddleware = require("./middleware/session.middleware");

// Invoke express
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);

module.exports = app;
