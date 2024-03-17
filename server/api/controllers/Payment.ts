import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import { rzpinstance } from "../config/razorpay";
import crypto from "crypto";
import Order from "../models/Order";
import User from "../models/User";
import Referral from "../models/Referral";


export const createOrder = async (req:Request, res:Response) => {
    try {
        const { user, productId, referral } = req.body;
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found",
                data: null,
            });
        }


        const existingCourse = user.purchases.find((purchase:any) => purchase.toString() === productId);
        if(existingCourse) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "You have already purchased this course",
                data: null,
            });
        }
        console.log("existing course in create order",existingCourse);

        const options = {
            amount: product.price * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `${user._id}_${Date.now()}`,
            notes: {
                userId: user._id,
                productId: productId,
            }
        };

        const order =  await rzpinstance.orders.create(options)
        const orderData = await Order.create({
            rzpOrderId: order.id,
            customer: user._id,
            product: productId,
            referralUsed: referral,
        });
        console.log("order in CREATE_ORDER",order)
        return res.status(200).json({
            success: true,
            error: false,
            message: "Order created successfully",
            data: order,
        });
    } catch (error:any) {

        console.error("Error in CREATE_ORDER controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }


}

export const verifyPayment = async (req:Request, res:Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(sign.toString())
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            const orderData = await Order.findOne({ rzpOrderId: razorpay_order_id }).session(session);
            if (!orderData) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: "Order not found",
                    data: null,
                });
            }
            const user =await User.findByIdAndUpdate(orderData.customer, { $push: { purchases: orderData.product } }).session(session);
            const product =await Product.findByIdAndUpdate(orderData.product, { $push: { consumers: orderData.customer } }).session(session);
            const referral = await Referral.findByIdAndUpdate(orderData.referralUsed, { $push: { consumers: orderData.customer } }).session(session);

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                success: true,
                error: false,
                message: "Payment verified successfully",
                data: null,
            });
        } else {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                error: true,
                message: "Payment verification failed",
                data: null,
            });
        }
    } catch (error: any) {
        console.error("Error in VERIFY_PAYMENT controller: ", error);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}