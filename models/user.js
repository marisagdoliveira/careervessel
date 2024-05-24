import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
}, { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema)
export default User;