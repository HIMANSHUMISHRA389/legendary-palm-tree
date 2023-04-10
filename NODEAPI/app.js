import express from "express";
import userRouter from "./routes/user.router.js"
import { config } from "dotenv";

export const app = express();


config({
  path:"./data/config.env"
})

//using middlewares
app.use(express.json());
app.use("/users",userRouter);

app.get("/",(req,res)=>{
  res.send("Nice working")
})











