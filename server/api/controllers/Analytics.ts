import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import { orderStatus } from "../data/constants";

export const getAdminAnalytics = async (req:Request, res:Response) => {
    try {
        const {user} = req.body;
        const instructorId = user._id;
        if(!mongoose.Types.ObjectId.isValid(instructorId)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid instructor id",
                data: null,
            });
        }
        const ordersIn1day = await Order.find({ instructor: instructorId, status: orderStatus.completed, createdAt: { $gte: new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)) } });
        const sales1day = ordersIn1day.reduce((acc,order) => acc + order.amount, 0);
        const ordersIn1week = await Order.find({ instructor: instructorId, status: orderStatus.completed, createdAt: { $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)) } });
        const sales1week = ordersIn1week.reduce((acc,order) => acc + order.amount, 0);
        const ordersIn1month = await Order.find({ instructor: instructorId, status: orderStatus.completed, createdAt: { $gte: new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)) } });
        const sales1month = ordersIn1month.reduce((acc,order) => acc + order.amount, 0);
        const orderIn1year = await Order.find({ instructor: instructorId, status: orderStatus.completed, createdAt: { $gte: new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000)) } });
        const sales1year = orderIn1year.reduce((acc,order) => acc + order.amount, 0);
        const lifetimeOrders = await Order.find({ instructor: instructorId, status: orderStatus.completed });
        const lifetimeSales = lifetimeOrders.reduce((acc,order) => acc + order.amount, 0);

        const data = [
            {
                name: "1 Day",
                sales: sales1day,
                orders: ordersIn1day.length
            },
            {
                name: "1 Week",
                sales: sales1week,
                orders: ordersIn1week.length
            },
            {
                name: "1 Month",
                sales: sales1month,
                orders: ordersIn1month.length
            },
            {
                name: "1 Year",
                sales: sales1year,
                orders: orderIn1year.length
            },
            {
                name: "Lifetime",
                sales: lifetimeSales,
                orders: lifetimeOrders.length
            }
        ]

        console.log(data)
        return res.status(200).json({
            success: true,
            error: false,
            message: "Instructor analytics fetched successfully",
            data: data,
        })
        
    } catch (error:any) {
        console.error("Error in GET_INSTRUCTOR_ANALYTICS controller:",error);

        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error",
            data: null,
        });        
    }

}
