import express, { Router } from "express";
import {
  getAllUsers,
  register,
  special,
  getUserById,
  updateUser,
  deleteUser
  
} from "../controllers/user.controller.js";

const router = Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.get("/userid/special", special);


router.route("/userid:id").get(getUserById).put(updateUser).delete(deleteUser);





// router.get("/userid/:id", getUserById);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);
export default router;
