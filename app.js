// Importing node core modules
const path = require("path");
// const http = require("http");

// Importing npm modules
const express = require("express");
// const socketio = require("socket.io");
require("dotenv").config();

// Importing custom routes
const productRoute = require("./routes/product.route");

// Creating express app and servers
const app = express();
// const httpServer = http.createServer(app);
// const socketServer = socketio(httpServer);

// Set up static folder
app.use(express.static(path.join(__dirname, "public")));

// Order route middleware
app.use(productRoute);

// Setting up socket.io connection
// socketServer.on("connection", (socket) => {
//   console.log("Client has been connected");

//   socket.emit("message", "Welcome to Restaurant ChatBot");
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// Creating server
// httpServer.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });
