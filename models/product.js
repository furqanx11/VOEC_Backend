import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    //user ki id jis ne task create kiya hai   
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // user is liye kynke collection ka name hai
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Product = mongoose.model("Product", schema);