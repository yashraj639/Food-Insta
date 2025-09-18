const express = require("express");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");

async function verifyFoodPToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Access Denied",
    });
  }
}

async function verifyUserToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Access Denied",
    });
  }
}

module.exports = {
  verifyFoodPToken,
  verifyUserToken,
};
