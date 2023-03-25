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
  password: String,
});

const User = mongoose.model("User", userSchema);

//Setting up view engine
app.set("view engine", "ejs");

//Authentiaction middleware
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decoded=jwt.verify(token, "khdjsfjkhsfd");
    req.user= await User.findById(decoded._id);
    console.log(req.user);
    next();
  } else {
    res.render("login");
  }
};






//all routes
app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user.name);
  res.render("logout", { name: req.user.name });
});


app.get("/register",(req,res)=>{
  res.render("register");
})



app.post("/register",async (req,res)=>{
const { name, email, password } = req.body;
console.log(req.body);
let newUser = await User.findOne({ email });
if (newUser) {
 return res.redirect("/login");
}
const user = await User.create({
  name,
  email,
  password
});

 
res.redirect("/");
});
  

//login route
app.get("/login",(req,res)=>{
  res.render("login");
})




app.post("/login", async (req, res) => {
 
const { name, email ,password} = req.body;
 let newUser = await User.findOne({email});
 if (!newUser) {
 return res.redirect("/register");
 }
 


  
  const user = await User.create({
    name,
    email,
    password,
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
  res.render("success");
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
