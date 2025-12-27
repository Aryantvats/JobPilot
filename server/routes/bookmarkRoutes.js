import express from "express";
import { protect } from "../middleware/auth.js";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";

const bookmarkRoutes = express.Router();

bookmarkRoutes.post("/", protect, addBookmark);
bookmarkRoutes.delete("/", protect, removeBookmark);
bookmarkRoutes.get("/",protect, getBookmarks);


export default bookmarkRoutes;