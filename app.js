import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import e from "express";
import { errorMiddleware } from "./middleware/error.js";
import referralRouter from "./routes/referralRoutes.js";


export const app = express();

config({
    path:"./data/config.env",
});

//using middlewares
app.use(express.json()); //ye hamesha router se pehle call hota hai
app.use(cookieParser());

//user routers
app.use("/users",userRouter);
app.use("/products",productRouter);
app.use("/referral",referralRouter);


app.get("/", (req, res) => {
    res.send("Hello World!");
})

//hamesha jab bhi async await user karte hein to try cath block me krna
app.use(errorMiddleware);
