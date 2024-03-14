import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";
import { accountTypes } from "../data/constants";

export async function auth(req:Request, res : Response, next:Function) {
    try {
        const token = req.body.token || (req?.header("Authorization")?.replace("Bearer ","") ?? null);

        if(!token) {
            return res.status(401).json({
                success:false,
                error:true,
                message:"Token is missing",
                data:null,
            });
        }
        const decode: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "User not found",
                data: null,
            });
        }

        req.body.user = user,

        next();        
    } catch (error:any) {
        console.log("Error in auth middleware : ", error);
        return res.status(500).json({
            success:false,
            error:true,
            message:"Internal Server Error",
            data:null,
        });        
    }
}

export function isAdmin(req: Request, res: Response, next: Function) {
    try {
        const user = req.body.user;
        if (user && user.accountType === accountTypes.admin) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                error: true,
                message: "Access denied",
                data: null,
            });
        }
    } catch (error: any) {
        console.log("Error in isAdmin middleware: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export function isConsumer(req: Request, res: Response, next: Function) {
    try {
        const user = req.body.user;
        if (user && user.accountType === accountTypes.consumer) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                error: true,
                message: "Access denied",
                data: null,
            });
        }
    } catch (error: any) {
        console.log("Error in isConsumer middleware: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}