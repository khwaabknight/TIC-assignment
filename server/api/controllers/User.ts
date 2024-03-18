import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { deleteFile } from "../utils/deleteFile";
import File from "../models/File";


export const updateProfile = async (req: Request, res: Response) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { user, name, email, fileUrl, fileId } = req.body;
        
        // Check if all required fields are present
        const editedUser = await User.findById(user._id).session(session);
        if(!editedUser) {
            return res.status(404).json({ 
                success: false,
                error: true,
                message: "User not found",
                data: null,
            });
        }

        let imgurl = null;

        if(name){
            editedUser.name = name;
        }
        if(email){
            editedUser.email = email;
        }
        if(fileUrl && fileId){
            const prevImage = editedUser.image as any;
            if(prevImage){
                await deleteFile(prevImage.fileId);
            }
            const image = await File.create({
                url:fileUrl,
                fileId
            });
            imgurl = fileUrl;
            editedUser.image = image._id as any;

        }

        await editedUser.save({ session });
        
        console.log(editedUser);
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Profile updated successfully",
            data: {
                user: {
                    _id: editedUser._id,
                    name: editedUser.name,
                    email: editedUser.email,
                    image: imgurl,                
                },
            },
        });
        
    } catch (error:any) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in UPDATE_PROFILE controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }
}

export const getUserProducts = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const populatedUser = await User.findById(user._id).populate({
            path: "purchases",
            populate: {
                path: "image",
                model: "File",
            },
        }).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "User products fetched successfully",
            data: {
                purchases: populatedUser?.purchases,
            },
        });
    } catch (error:any) {
        console.log("Error in GET_USER_PRODUCTS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}