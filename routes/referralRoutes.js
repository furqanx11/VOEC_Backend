import express from "express";
import { referUser } from "../contollers/referralController.js";

const router = express.Router();

router.post("/refer", referUser);

export default router;
