import Razorpay from "razorpay";
require('dotenv').config();

export const rzpinstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});