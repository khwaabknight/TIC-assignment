import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';

export const uploadFile = async (req:Request, res:Response, next:NextFunction)=>{
    const file = req.files ? (Array.isArray(req.files.image) ? req.files.image[0] : req.files.image) : null;
    
    console.log("req.files in uploadfilee",req.files)
    console.log("file in uploadfilee",file)

    if(!file){
        return next();
    }
    try{
        console.log("inside the try block in uploadfilee")
        const response = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
            folder: 'productImages',
        });
        console.log("cloudinary response",response);
        req.body.fileUrl = response.secure_url;
        req.body.fileId = response.public_id;

        console.log("request body after cloudinary response",req.body)
        next();
    }catch(error){
        console.log("Error in uploadFile middleware: ",error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};
