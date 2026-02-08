import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        console.error("Error connecting to MongoDB:", error);
    }
}