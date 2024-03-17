import { Request, Response } from 'express';
import mongoose, { startSession } from 'mongoose';
import Section from '../models/Section';
import File, { FileType } from '../models/File';
import Product from '../models/Product';
import { deleteFile } from '../utils/deleteFile';

// Create a new section
export const createSection = async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { name, description, productId, fileId, fileUrl } = req.body;
        console.log(req.body)

        if (!name || !description || !productId || !fileId || !fileUrl) {
            return res.status(400).json({ 
                success: false, 
                error: true, 
                message: "Please provide all the required fields", 
                data: null
            });
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ 
                success: false, 
                error: true, 
                message: "Product not found", 
                data: null
            });
        }
        
        const video = await File.create({ url: fileUrl, fileId: fileId });

        const section = new Section({ name, description, video : video._id, product: productId});
        await section.save({ session });
        if(!product.productSections){
            product.productSections = [];
        }
        product.productSections.push(section._id as any);
        await product.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Section created successfully",
            data: section,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in CREATE_SECTION controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};

// Update an existing section
export const updateSection = async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { name, description, fileId, fileUrl } = req.body;
        const { sectionId } = req.params;

        const section = await Section.findById(sectionId).session(session);

        if (!section) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Section not found",
                data: null,
            });
        }
        if (name) section.name = name;
        if(description) section.description = description;
        if (fileUrl && fileId) {
            const prevVideo = section.video as FileType;
            if (prevVideo) {
                await deleteFile(prevVideo.fileId);
            }
            const video = new File({
                fileUrl,
                fileId
            });
            await video.save({ session });
            section.video = new mongoose.Schema.Types.ObjectId(video._id.toString());
        }

        await section.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Section updated successfully",
            data: section,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in UPDATE_SECTION controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};

// Delete a section
export const deleteSection = async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const { sectionId } = req.params;

        
        const section = await Section.findByIdAndDelete(sectionId).populate('video').session(session);
        if (section?.video) {
            await File.findByIdAndDelete((section?.video as FileType)._id).session(session);            
        }
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Section deleted successfully",
            data: section,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in DELETE_SECTION controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};