const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    sessionID: {
      type: String,
      required: [true, "Session ID is required"],
      trim: true,
    },
    placedOrder: [
      {
        itemId: Number,
        menu: String,
      },
    ],
    currentOrder: [
      {
        itemId: Number,
        menu: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
