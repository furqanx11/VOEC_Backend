import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";
import { Referral } from "../models/referral.js";

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

    const user = await User.findOne({email}).select("+password");

    if(!user)
        return next(new ErrorHandler("USer not found", 400));


    const isMatch = await bcrypt.compare(password, user.password);

    
    if(!isMatch)
        return next(new ErrorHandler("invalid email or password", 400));

    sendCookie(user, res, `Welcome Back,${user.name}`, 200);

}

export const getMyProfile = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const referrals = await Referral.find({ referrer: currentUser._id });

        let referredUsersCount = 0;
        let referralPoints = 0;

        referrals.forEach(referral => {
            if (referral.pointsGiven) {
                referralPoints += 1; // Adjust this logic based on your points system
            }
            referredUsersCount++;
        });

        res.status(200).json({
            success: true,
            user: {
                _id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                referralPoints,
                referredUsersCount
            }
        });
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res, next) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
        
    }).json({
        success: true,
        message: "Logged out"
    })
}

