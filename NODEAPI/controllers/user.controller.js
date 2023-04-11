import User from "../models/user.model.js";
import sendCookie from "../utils/feature.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.json({
    message: "User Found",
    user,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      message: "User already exists",
      success: false,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered Successfully", 201);
};

//Login
export const login = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      message: "Invalid Email or Password",
      success: false,
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      message: "Invalid Email or Password",
      success: false,
    });

  sendCookie(user, res, `Welcome back, ${user.name}`);
};

//getMyProfile
export const getMyProfile = (req, res) => {
  //const user= await User.findById(id);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
