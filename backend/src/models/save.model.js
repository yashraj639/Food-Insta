const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItem",
    },
  },
  {
    timestamps: true,
  }
);

const savedModel = mongoose.model("saved", savedSchema);

module.exports = savedModel;
