import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose
 .connect(process.env.MONGO_URI, {
    dbName: "backend-api"
 })
 .then(() => {
    console.log("Connected to MongoDB");
 })
 .catch((error) => {
    console.log(error);
 })
}