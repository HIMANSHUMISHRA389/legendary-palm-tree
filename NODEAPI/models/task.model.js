import mongoose from "mongoose";
import User from "./user.model.js";


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", schema);

export default Task;
