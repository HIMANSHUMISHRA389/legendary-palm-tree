import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

 const isAuthenticated=async(req,res,next)=>{
const { token } = req.cookies;


if (!token)
  return res.status(404).json({
    message: "Login First",
    success: false,
  });

const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded._id);
req.user=user;
 next();
}
 export default isAuthenticated;