
import express from "express";
import { 
  createProfile, 
  getProfile, 
  updateProfile, 
  deleteProfile 
} from "../controllers/profileController.js";

import upload from "../config/multer.js"; 
import authMiddleware from "../middleware/authMiddleware.js";

const profileRoutes = express.Router();

profileRoutes.post("/", authMiddleware, upload.single("resume"), createProfile);

profileRoutes.get("/:id", getProfile);


profileRoutes.put("/:id", authMiddleware, upload.single("resume"), updateProfile);



export default profileRoutes;
