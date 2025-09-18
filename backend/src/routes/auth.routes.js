const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// User Authentications API
router.post("/user/register", authController.signupUser);
router.post("/user/signin", authController.signinUser);
router.get("/user/signout", authController.signoutUser);

// Food Partner Authentications API
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/signin", authController.signinFoodPartner);
router.get("/food-partner/signout", authController.signoutFoodPartner);

module.exports = router;
