const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodPartnerController = require("../controllers/foodPartner.controller");

const router = express.Router();

router.get(
  "/:id",
  authMiddleware.verifyUserToken,
  foodPartnerController.getFoodPartnerById
);

module.exports = router;
