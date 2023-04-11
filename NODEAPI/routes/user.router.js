import express, { Router } from "express";
import {
  getAllUsers,
  register,
  getMyProfile,
  login,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);

router.get("/me",getMyProfile);
export default router;
