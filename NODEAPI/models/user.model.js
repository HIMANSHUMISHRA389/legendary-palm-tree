import mongoose from "mongoose";

 

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique:true,
  },
  password: {
    type:String,
    select:false,
  },
  createAt:{
    type:Date,
    default:Date.now,
  }
});

const User = mongoose.model("User", schema);
 
export default User;