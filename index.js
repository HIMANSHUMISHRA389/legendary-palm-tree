const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");

//using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mongoose install
mongoose
  .connect("mongodb://127.0.0.1", {
    dbName: "backend",
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

//Setting up view engine
app.set("view engine", "ejs");

//Authentiaction middleware
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    next();
  } else {
    res.render("login");
  }
};

//all routes
app.get("/", isAuthenticated, (req, res) => {
  res.render("logout");
});

//login route
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  const user = await User.create({
    name,
    email,
  });
  const token = jwt.sign({
    _id: user._id,
  },
  "khdjsfjkhsfd");
console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

//logout route
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(3000, (req, res) => {
  console.log("Server is up");
});
