
import express from "express";
import { 
  getProfile,
  saveProfile, 
} from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";


const profileRoutes = express.Router();

profileRoutes.post("/", protect, saveProfile);

profileRoutes.get("/me", protect,getProfile);





export default profileRoutes;
