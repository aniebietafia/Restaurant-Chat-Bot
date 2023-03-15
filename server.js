// Importing node core modules
const http = require("http");

// Importing npm packages
const { Server } = require("socket.io");
require("dotenv").config();

// Importing custom modules
const app = require("./app");
const mongodb_connection = require("./db/database");
const {
  saveSessionID,
  loadMessage,
  welcomeMessage,
  menuList,
  menu,
  checkOutOrder,
  orderHistory,
  currentOrder,
  cancelOrder,
  saveOrder,
} = require("./controllers/sessions.controller");
const displayMessages = require("./utils/display-messages");
const sessionMiddleware = require("./config/sessionMiddleware");
const { config } = require("./config/setup");
const MessageSchema = require("./model/message.model");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

io.engine.use(sessionMiddleware);

//to save the flow and remember previous message
const levels = {};

io.on("connection", async (socket) => {
  // get the session
  const session = socket.request.session;
  const sessionId = session.id;

  saveSessionID(sessionId);
  //connect users with the same session id
  socket.join(sessionId);
  //welcome users to chat bot
  welcomeMessage(io, sessionId);
  loadMessage(io, sessionId);

  //listen for user message
  levels[sessionId] = 0;
  socket.on("private message", async (msg) => {
    let userMessage = displayMessages("Guest", msg);
    const number = Number(msg);
    io.to(sessionId).emit("user message", userMessage);
    let botMessage = "";

    switch (levels[sessionId]) {
      case 0:
        botMessage = await menuList(io, sessionId);
        levels[sessionId] = 1;
        break;
      case 1:
        if (number === 1) {
          botMessage = await menu(io, sessionId);
          levels[sessionId] = 2;
          return;
        } else if (number === 99) {
          botMessage = await checkOutOrder(io, sessionId);
          levels[sessionId] = 1;
        } else if (number === 98) {
          botMessage = await orderHistory(io, sessionId);
          levels[sessionId] = 1;
        } else if (number === 97) {
          botMessage = await currentOrder(io, sessionId);
        } else if (number === 0) {
          botMessage = await cancelOrder(io, sessionId);
        } else {
          botMessage = await displayMessages(config.botName, "Invalid Input. Enter 1 or 99 or 98 or 97 or 0");
          io.to(sessionId).emit("bot message", botMessage);
        }
        levels[sessionId] = 1;
        break;
      case 2:
        if (
          number !== 1 &&
          number !== 2 &&
          number !== 3 &&
          number !== 4 &&
          number !== 5 &&
          number !== 6 &&
          number !== 7
        ) {
          botMessage = await displayMessages(config.botName, "Invalid Input. Enter 1 or 2 or 3 or 4 or 5");
          io.to(sessionId).emit("bot message", botMessage);
          levels[sessionId] = 2;
          return;
        } else {
          botMessage = await saveOrder(io, sessionId, number);
          levels[sessionId] = 1;
        }
        break;
    }
    const saveMessage = await new MessageSchema({
      sessionID: sessionId,
      userMessage,
      botMessage,
    });
    await saveMessage.save();
  });
});

mongodb_connection(server);
