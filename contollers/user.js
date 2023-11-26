import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";

//ye admin panel hai jis se sare user dikhe ge
export const getAllUser = async (req, res, next) => {

}

export const register =  async (req, res, next) => {
    const{name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user)
        return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    sendCookie(user, res, "Registered Successfully", 201);
    
}

export const login = async (req, res, next) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password"); //+pass isliye kynke humne models me select false kiya wa hai to access karne ke liye

    if(!user)
        return next(new ErrorHandler("USer not found", 400));


    const isMatch = await bcrypt.compare(password, user.password);

    
    if(!isMatch)
        return next(new ErrorHandler("invalid email or password", 400));

    sendCookie(user, res, `Welcome Back,${user.name}`, 200);

}

export const getMyProfile = (req, res, next) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })  

}

export const logout = (req, res, next) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
        
    }).json({
        success: true,
        message: "Logged out"
    })
}

