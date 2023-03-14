const SessionDB = require("../model/session.model");
const MessageSchema = require("../model/message.model");
const displayMessages = require("../utils/display-messages");
const { mainMenu, foodMenu } = require("../utils/mainmenu");
const displayOptions = require("../utils/display-options");
const { config } = require("../config/config");

const saveSessionID = async (sessionID) => {
  const checksessionID = await SessionDB.findOne({ sessionID });

  if (!checksessionID) {
    await SessionDB.create({ sessionID });
  }
};

const loadMessage = async (io, sessionID) => {
  const oldMessages = await MessageSchema.find({ sessionID });

  if (!oldMessages) return;

  oldMessages.forEach((message) => {
    io.to(message.sessionID).emit("user message", message.userMessage);
    io.to(message.sessionID).emit("bot message", message.botMessage);
  });
};

const welcomeMessage = (io, sessionID) => {
  io.to(sessionID).emit(
    "bot message",
    displayMessages(config.botName, "Welcome to the Restaurant ChatBot <br> Type 'bot' in the input to get started")
  );
};

const menuList = (io, sessionID) => {
  let botMessage = displayMessages(config.botName, displayOptions("mainMenu", mainMenu));
  io.to(sessionID).emit("bot message", botMessage);
  return botMessage;
};

const menu = (io, sessionID) => {
  let botMessage = displayMessages(config.botName, displayOptions("Add Item to your list", foodMenu));
  io.to(sessionID).emit("bot message", botMessage);
  return botMessage;
};

const checkOutOrder = async (io, sessionID) => {
  const sessionOrder = await SessionDB.findOne({ sessionID });

  let botMessage = "";
  if (sessionOrder.currentOrder.length < 1) {
    botMessage = displayMessages(config.botName, "You have not ordered anything yet");
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    sessionOrder.placedOrder = [...sessionOrder.currentOrder, ...sessionOrder.placedOrder];
    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    botMessage = displayMessages(config.botName, `Order has been Placed`);

    io.to(sessionID).emit("bot message", botMessage);
  }
  io.to(sessionID).emit("bot message", displayMessages(config.botName, mainMenu));

  return botMessage;
};

const orderHistory = async (io, sessionID) => {
  const sessionOrder = await SessionDB.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.placedOrder.length < 1) {
    botMessage = displayMessages(config.botName, "You do not have any order history yet");
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = displayMessages(
      config.botName,
      displayOptions("This is your Order History", sessionOrder.placedOrder)
    );
    io.to(sessionID).emit("bot message", botMessage);
  }
  io.to(sessionID).emit("bot message", displayMessages(config.botName, mainMenu));

  return botMessage;
};

const currentOrder = async (io, sessionID) => {
  const sessionOrder = await SessionDB.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = displayMessages(config.botName, "You do not have any order yet");
    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = displayMessages(config.botName, displayOptions("Your Current Order", sessionOrder.currentOrder));
    io.to(sessionID).emit("bot message", botMessage);
  }

  io.to(sessionID).emit("bot message", displayMessages(config.botName, mainMenu));

  return botMessage;
};

const cancelOrder = async (io, sessionID) => {
  const sessionOrder = await SessionDB.findOne({ sessionID });

  let botMessage = "";

  if (sessionOrder.currentOrder.length < 1) {
    botMessage = displayMessages(config.botName, "You do not have any order(s) yet");

    io.to(sessionID).emit("bot message", botMessage);
  } else {
    botMessage = displayMessages(config.botName, "You have cancelled your order.");

    sessionOrder.currentOrder = [];
    await sessionOrder.save();

    io.to(sessionID).emit("bot message", botMessage);
  }
  //TODO: save the resposne to the database
  io.to(sessionID).emit("bot message", displayMessages(config.botName, mainMenu));

  return botMessage;
};

const saveOrder = async (io, sessionID, number) => {
  const sessionOrder = await SessionDB.findOne({ sessionID });

  let botMessage = "";

  if (number === 1) {
    sessionOrder.currentOrder.push(foodMenu[0]);
  }
  if (number === 2) {
    sessionOrder.currentOrder.push(foodMenu[1]);
  }
  if (number === 3) {
    sessionOrder.currentOrder.push(foodMenu[2]);
  }
  if (number === 4) {
    sessionOrder.currentOrder.push(foodMenu[3]);
  }
  if (number === 5) {
    sessionOrder.currentOrder.push(foodMenu[4]);
  }
  if (number === 6) {
    sessionOrder.currentOrder.push(foodMenu[5]);
  }
  if (number === 7) {
    sessionOrder.currentOrder.push(foodMenu[6]);
  }

  await sessionOrder.save();

  botMessage = displayMessages(config.botName, displayOptions("Order Added", sessionOrder.currentOrder));
  io.to(sessionID).emit("bot message", botMessage);

  io.to(sessionID).emit("bot message", displayMessages(config.botName, mainMenu));

  return botMessage;
};

module.exports = {
  saveSessionID,
  loadMessage,
  welcomeMessage,
  menu,
  menuList,
  checkOutOrder,
  orderHistory,
  currentOrder,
  cancelOrder,
  saveOrder,
};
