import { Application, Request, Response } from "express";

import express from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import profileRoutes from './routes/profileRoutes';
import cloudinaryConnect from './config/cloudinary';
import cors from 'cors';
import dbConnect from "./config/database";
import fileUpload from 'express-fileupload';
require('dotenv').config();


dbConnect();
cloudinaryConnect();

const PORT = process.env.PORT || 4000;
const server : Application = express();

server.use(express.json());
server.use(cors({
    origin:'*'
}));
server.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

server.get("/",(req : Request,res : Response) => {
    return res.json({
        success:true,
        message:"Your server is up and running ...",
    })
});


// Auth Routes
server.use("/api/auth",authRoutes);
// Product Routes
server.use("/api/product",productRoutes);
// Profile Routes
server.use("/api/profile",profileRoutes);


server.listen(PORT,() => {
    console.log(`App is running at port ${PORT}`);
})