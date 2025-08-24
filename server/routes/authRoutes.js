import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/me", getMe);

export default authRoutes;