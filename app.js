// Importing node core modules
const path = require("path");
// const http = require("http");

// Importing npm modules
const express = require("express");
const mongoose = require("mongoose");
// const socketio = require("socket.io");
require("dotenv").config();

// Creating express app
const app = express();
//const server = http.createServer(app);
//const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// Setting up socket.io connection

const PORT = process.env.PORT || 8000;

// Creating server

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    // server.listen(PORT, () => {
    //   console.log(`Server started on http://localhost:${PORT}`);
    // });
    const server = app.listen(PORT);
    const socketio = require("socket.io")(server);
    socketio.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
