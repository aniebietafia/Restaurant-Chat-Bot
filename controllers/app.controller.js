const sessionDB = require("../models/session.models");
const Message = require("../models/message.models");
const displayMessage = require("../utils/message");
const { menu_items, special_dishes } = require("../utils/menu_items");
const displayItems = require("../utils/displayItems");
const { config_settings } = require("../middleware/session.middleware");

const saveSessionID = async (sessionID) => {
  const checksessionID = await sessionDB.findOne({ sessionID });

  if (!checksessionID) {
    await sessionDB.create({ sessionID });
  }
};

const loadMessage = async (io, sessionID) => {
  const oldMessages = await Message.find({ sessionID });

  if (!oldMessages) return;

  oldMessages.forEach((message) => {
    io.to(message.sessionID).emit("user message", message.user_message);
    io.to(message.sessionID).emit("bot message", message.bot_message);
  });
};

const welcomeMessage = (io, sessionID) => {
  io.to(sessionID).emit(
    "bot message",
    formatMessage(config_settings.BOTNAME, "Welcome to the ChatBot! <br> Type 'hello' to get started.")
  );
};

const menu_items = (io, sessionID) => {
  let bot_message = displayMessage(config_settings.BOTNAME, displayItems("menu_items", menu_items));
  io.to(sessionID).emit("bot message", bot_message);
  return bot_message;
};

const addToCart = (io, sessionID) => {
  let bot_message = displayMessage(config_settings.BOTNAME, displayItems("Add item to cart", menu_items));
  io.to(sessionID).emit("bot message", bot_message);
  return bot_message;
};

module.exports = {
  saveSessionID,
  loadMessage,
  welcomeMessage,
  menu_items,
  addToCart,
};
