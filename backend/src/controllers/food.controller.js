const { get } = require("mongoose");
const foodItemModel = require("../models/foodItem.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.model");
const savedModel = require("../models/save.model");

async function postFoodVideo(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodItemModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  return res
    .status(200)
    .json({ message: "Food created successfully", food: foodItem });
}

async function watchFoodVideo(req, res) {
  const foodItems = await foodItemModel.find();
  return res
    .status(200)
    .json({ message: "Food retrieved successfully", foodItems });
}

// controllers/foodController.js
async function likeFoodVideo(req, res) {
  const { foodId } = req.body;
  const userId = req.user._id;

  const alreadyLiked = await likeModel.findOne({ user: userId, food: foodId });

  if (alreadyLiked) {
    // Unlike
    await likeModel.deleteOne({ _id: alreadyLiked._id });
    const updated = await foodItemModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: -1 } },
      { new: true }
    );
    return res.json({
      message: "Unliked successfully",
      isLiked: false,
      likeCount: updated.likeCount,
    });
  }

  // Like
  await likeModel.create({ user: userId, food: foodId });
  const updated = await foodItemModel.findByIdAndUpdate(
    foodId,
    { $inc: { likeCount: 1 } },
    { new: true }
  );
  return res.json({
    message: "Liked successfully",
    isLiked: true,
    likeCount: updated.likeCount,
  });
}

// controllers/foodController.js
async function saveFoodVideo(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    const alreadySaved = await savedModel.findOne({
      user: userId,
      food: foodId,
    });

    if (alreadySaved) {
      // Unsave
      await savedModel.deleteOne({ _id: alreadySaved._id });
      const updated = await foodItemModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: -1 } },
        { new: true }
      );
      return res.json({
        message: "Video unsaved successfully",
        isSaved: false,
        saveCount: updated.saveCount,
      });
    }

    // Save
    await savedModel.create({ user: userId, food: foodId });
    const updated = await foodItemModel.findByIdAndUpdate(
      foodId,
      { $inc: { saveCount: 1 } },
      { new: true }
    );
    return res.json({
      message: "Video saved successfully",
      isSaved: true,
      saveCount: updated.saveCount,
    });
  } catch (err) {
    console.error("Save error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// controllers/foodController.js
async function getSavedVideos(req, res) {
  try {
    const user = req.user;

    const saved = await savedModel.find({ user: user._id }).populate("food");

    const videos = saved.map((item) => ({
      ...item.food.toObject(),
      isSaved: true,
    }));

    res.json({ videos });
  } catch (err) {
    console.error("Fetch saved error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  postFoodVideo,
  watchFoodVideo,
  likeFoodVideo,
  saveFoodVideo,
  getSavedVideos,
};
