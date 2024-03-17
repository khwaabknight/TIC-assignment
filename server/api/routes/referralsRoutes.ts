import express from "express";
const router = express.Router();

import { createReferral } from "../controllers/Referrals";
import { auth, isConsumer } from "../middlewares/auth";


// Route for create referral
router.post("/createReferral", auth, isConsumer, createReferral);

export default router;
