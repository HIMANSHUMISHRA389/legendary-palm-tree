import Task from "../models/task.model.js"

export const newTask=async(req,res,next)=>{
const{title,description}=req.body;



try {
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
} catch (error) {
    console.log(error);
}
}