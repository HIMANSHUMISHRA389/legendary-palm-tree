import User from "../models/task.model.js";

export const isAuthenticated=async(req,res,next)=>{
const { token } = req.cookies;
//console.log(token);

if (!token)
  return res.status(404).json({
    message: "Login First",
    success: false,
  });

const decoded = jwt.verify(token, process.env.JWT_SECRET);


 req.user=await User.findById(decoded._id);
 next();
}