const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post(
  "/post-food-video",
  authMiddleware.verifyFoodPToken,
  upload.single("video"),
  foodController.postFoodVideo
);

router.get(
  "/watch-food-video",
  authMiddleware.verifyUserToken,
  foodController.watchFoodVideo
);

router.post(
  "/like-video",
  authMiddleware.verifyUserToken,
  foodController.likeFoodVideo
);

router.post(
  "/save-video",
  authMiddleware.verifyUserToken,
  foodController.saveFoodVideo
);

router.get(
  "/saved-videos",
  authMiddleware.verifyUserToken,
  foodController.getSavedVideos
);

module.exports = router;
