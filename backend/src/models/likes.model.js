const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
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

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
