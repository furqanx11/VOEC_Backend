import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    referralPoints: {
        type: Number,
        default: 0
    },
    referredUsersCount: {
        type: Number,
        default: 0
    },
    feedback: {
        type: String
    }
});

export const User = mongoose.model("User", userSchema);
