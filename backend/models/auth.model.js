import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    }
}); 
const AuthModel = mongoose.model("Auth", AuthSchema);

export default AuthModel;