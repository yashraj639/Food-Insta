require("dotenv").config();
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const { z } = require("zod");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Auth Controllers

const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

async function signupUser(req, res) {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Validation error" });
  }

  const { firstName, email, password } = parsed.data;

  const userExists = await userModel.findOne({
    email,
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    firstName,
    email,
    password: hashPassword,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  return res.status(201).json({
    message: "User created",
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    },
  });
}

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

async function signinUser(req, res) {
  const parsed = signinSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Validation error" });
  }

  const { email, password } = parsed.data;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  return res.status(201).json({
    message: "Signin successful",
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    },
  });
}

function signoutUser(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Signout successful" });
}

// foodPartner Auth Controllers

const foodPartnerSignupSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name too long"),
  ownerName: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name too long"),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

async function registerFoodPartner(req, res) {
  const parsed = foodPartnerSignupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Validation error" });
  }

  const { businessName, ownerName, phoneNumber, email, password, address } =
    parsed.data;

  const foodPartnerExists = await foodPartnerModel.findOne({
    email,
  });

  if (foodPartnerExists) {
    return res.status(400).json({ message: "foodPartner already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    businessName,
    ownerName,
    phoneNumber,
    email,
    password: hashPassword,
    address,
  });
  const token = jwt.sign(
    { id: foodPartner._id, email: foodPartner.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  return res.status(201).json({
    message: "foodPartner created",
    foodPartner: {
      id: foodPartner._id,
      email: foodPartner.email,
      firstName: foodPartner.firstName,
    },
  });
}

const foodPartnerSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

async function signinFoodPartner(req, res) {
  const parsed = foodPartnerSigninSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Validation error" });
  }

  const { email, password } = parsed.data;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const matchedPassword = await bcrypt.compare(password, foodPartner.password);

  if (!matchedPassword) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const token = jwt.sign(
    { id: foodPartner._id, email: foodPartner.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  return res.status(201).json({
    message: "foodPartner signin successfully",
    foodPartner: {
      id: foodPartner._id,
      email: foodPartner.email,
      firstName: foodPartner.firstName,
    },
  });
}

function signoutFoodPartner(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Signout successful" });
}

module.exports = {
  signupUser,
  signinUser,
  signoutUser,
  registerFoodPartner,
  signinFoodPartner,
  signoutFoodPartner,
};
