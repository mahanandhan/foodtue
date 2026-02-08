import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import AuthModel from "../models/auth.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { email, username, password, mobile } = req.body;
        if (!email || !username || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await AuthModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new AuthModel({
            email,
            username,
            password: hashedPassword,
            mobile
        });

        // Save first
        await newUser.save();

        // Generate JWT cookie
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            mobile: newUser.mobile
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const matchingUser = await AuthModel.findOne({ email });

        if (!matchingUser || !(await bcrypt.compare(password, matchingUser.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        generateTokenAndSetCookie(matchingUser._id, res);

        res.status(200).json({
            _id: matchingUser._id,
            email: matchingUser.email,
            username: matchingUser.username,
            mobile: matchingUser.mobile
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user; // Set by protectRoute middleware
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting current user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
