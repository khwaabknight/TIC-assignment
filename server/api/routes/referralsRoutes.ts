import express from "express";
const router = express.Router();

import { createReferral, getMyReferrals } from "../controllers/Referrals";
import { auth, isConsumer } from "../middlewares/auth";


// Route for create referral
router.post("/createReferral", auth, isConsumer, createReferral);

// Route for get my referrals
router.get("/getmyreferrals", auth, isConsumer, getMyReferrals);

export default router;
