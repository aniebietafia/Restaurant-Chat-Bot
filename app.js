// Importing node core modules
const path = require("path");
const http = require("http");

// Importing npm modules
const express = require("express");
const socketio = require("socket.io");
require("dotenv").config();

// Creating express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Setting up socket.io connection

const PORT = process.env.PORT || 4000;

// Creating server
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
