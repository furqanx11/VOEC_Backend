import express from "express";
import { getAllUser, register, login, getMyProfile, logout } from "../contollers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logout)


export default router
