const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    sessionID: {
      type: String,
      required: [true, "Session ID is required"],
      trim: true,
    },
    user_message: {
      username: String,
      info: String,
    },
    bot_message: {
      username: String,
      info: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
