import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}


export const registerUser=async (req,res) => {
    try {
        const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Fill all the details" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({success:false,message:"User already exists please login"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({ name, email, password: hashedPassword });

    const token = generateToken((await user)._id.toString());
    res.json({ success: true, token });
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const loginUser=async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken((await user)._id.toString());
        res.json({ success: true, token });
        

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getMe=async (req,res) => {
    try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
    } catch (error) {
        
    }
}