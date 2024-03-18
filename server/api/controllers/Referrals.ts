import { Request, Response } from "express";
import Referral from "../models/Referral";
import User from "../models/User";
import mongoose from "mongoose";

export const createReferral = async (req: Request, res: Response) => {
    const { user, productId} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if(!user || !productId){
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide user and product",
                data: null,
            });
        }

        const existingReferral = await Referral.findOne({provider:user._id,product:productId});
        if(existingReferral){
            return res.status(200).json({
                success: true,
                error: false,
                message: "Referral already exists",
                data: existingReferral,
            });
        }

        const referral = await Referral.create({
            provider:user._id,
            product:productId,
        });
        await User.findByIdAndUpdate(user._id,{$push:{referrals:referral._id}});
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Referral Created Successfully",
            data: referral,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in CREATE_REFERRAL controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const getMyReferrals = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const referrals = await Referral.find({provider:user._id}).populate("product usedBy").exec();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Referrals Fetched Successfully",
            data: referrals,
        });
        
    } catch (error) {
        console.log("Error in GET_MY_REFERRALS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}