import express from "express";
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import refferalRoutes from "./routes/refferalRoute.js";


const app = express();

await connectDB();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("api is working");
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/careerJobs", careerRoutes);
app.use("/api/v1/refferal", refferalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

export default app;