import jwt from "jsonwebtoken";

 const sendCookie=(user,res,message,statusCode=200)=>{
  //jwt token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
}
export default sendCookie;