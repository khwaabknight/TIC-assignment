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
            const image = new File({
                fileUrl,
                fileId
            });
            await image.save({ session });
            editedUser.image = new mongoose.Schema.Types.ObjectId(image._id.toString());
        }

        await editedUser.save({ session });
        
        await session.commitTransaction();
        session.endSession();        
        
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