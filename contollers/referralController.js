import { User } from "../models/user.js";
import { Referral } from "../models/referral.js";
import ErrorHandler from "../middleware/error.js";

export const referUser = async (req, res, next) => {
    const { referrerEmail, referredEmail } = req.body;

    try {
        // Checking agar dono user exist karte hein ya nahi
        const referrer = await User.findOne({ email: referrerEmail });
        const referred = await User.findOne({ email: referredEmail });

        if (!referrer || !referred) {
            return next(new ErrorHandler("Referrer or referred user not found", 400));
        }

        // Update points for referrer and referred user
        referrer.referralPoints += 1; 
        referred.referredUsersCount += 1; 

        await referrer.save();
        await referred.save();

        // Create a referral record
        const referral = new Referral({
            referrer: referrer._id,
            referred: referred._id,
            pointsGiven: true
        });

        await referral.save();

        res.status(200).json({
            success: true,
            message: "Referral points added successfully",
            referrer,
            referred,
        });
    } catch (error) {
        return next(new ErrorHandler("Error in referral process", 500));
    }
};
