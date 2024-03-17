import express from "express";
const router = express.Router();

import { createOrder, verifyPayment } from "../controllers/Payment";
import { auth, isConsumer } from "../middlewares/auth";

// Route for creating order
router.post("/createorder", auth, isConsumer, createOrder);

// Route for verifying payment
router.post("/verifypayment", auth, isConsumer, verifyPayment);

export default router;