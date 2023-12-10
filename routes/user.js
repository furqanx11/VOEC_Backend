import express from "express";
import { getAllUser, register, login, getMyProfile, addFeedback, logout } from "../contollers/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/feedback", isAuthenticated, addFeedback);

router.get("/logout", logout)


export default router
