import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp", "lol").json({
    success: true,
    message: "Registered Successfully",
  });
};

export const special = (req, res) => {
  res.status(200).json({
    success: true,
    user: "just joking",
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);



  res.status(200).json({
    success: true,
    message:"updated",
   
  });
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);



  res.status(200).json({
    success: true,
    message: "deleted",
  });
};