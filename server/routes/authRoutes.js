import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";

const authRoutes = express.Router();

authRoutes.post("/register", validate(loginSchema),registerUser);
authRoutes.post("/login",validate(registerSchema), loginUser);
authRoutes.get("/me",protect, getMe);

export default authRoutes;