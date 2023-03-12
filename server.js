// Importing core modules
const http = require("http");

// Importing npm packages
const { Server } = require("socket.io");

const app = require("./app");
const mongodb_connection = require("./db/connect");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
  // Get the session id
  const session = socket.request.session;
  const sessionId = session.id;

  //   Connecting users with the same session id
  socket.join(sessionId);

  // Welcome message from the ChatBot
});
