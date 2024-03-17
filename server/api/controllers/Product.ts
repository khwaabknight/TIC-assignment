import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import User from "../models/User";
import File from "../models/File";
import {deleteFile} from "../utils/deleteFile";
import { productTypes } from "../data/constants";
import Section from "../models/Section";

export const addProduct = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { user, title, description, productType, price, fileUrl, fileId } = req.body;

        // Check if all required fields are present
        if(!title || !description || !productType || !fileUrl || !fileId) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: "Insufficient Data",
                data: null,
            });
        }

        const image = new File({
            url:fileUrl,
            fileId,
        });
        await image.save({ session });


        // Create a new product object
        const product = new Product({
            title,
            description,
            author: user._id,
            productType,
            price,
            image: image._id,
        });
        await product.save({ session });
        await User.findByIdAndUpdate(user._id, {
            $push: { products: product._id }
        }, { session});

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product added successfully",
            data: product
        });

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in ADD_PRODUCT controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {_id:productId, title, description, price, fileUrl, fileId } = req.body;

        // Check if productId is present
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required",
                data: null,
            });
        }

        // Find the product by productId
        const product = await Product.findById(productId).populate('image').session(session);

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found",
                data: null,
            });
        }


        // Update the product fields if they are present in the request body
        if (title) {
            product.title = title;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }
        if (fileUrl && fileId) {
            const prevImage = product.image as any;
            if (prevImage) {
                await deleteFile(prevImage.fileId);
            }
            const image = new File({
                fileUrl,
                fileId
            });
            await image.save({ session });
            product.image = new mongoose.Schema.Types.ObjectId(image._id.toString());
        }

        await product.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product updated successfully",
            data: product,
        });

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in UPDATE_PRODUCT controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { productId } = req.body;

        // Check if productId is present
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required",
                data: null,
            });
        }

        // Find the product by productId
        const product = await Product.findById(productId).populate('image').session(session);

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found",
                data: null,
            });
        }

        // Delete the associated image file
        const image = product.image as any;
        if (image) {
            await deleteFile(image.fileId);
        }

        // Remove the product from the user's products array
        await User.findByIdAndUpdate(product.author, {
            $pull: { products: product._id }
        }, { session });

        // Delete the product
        await Product.findByIdAndDelete(productId).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product deleted successfully",
            data: null,
        });

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        console.log("Error in DELETE_PRODUCT controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allproducts = await Product.find().populate('author image');
        const courses = await Product.find({productType:productTypes.course}).populate('author image');
        const events = await Product.find({productType:productTypes.event}).populate('author image');
        return res.status(200).json({
            success: true,
            error: false,
            message: "Products fetched successfully",
            data: {
                allproducts,
                courses,
                events,
            },
        });
    } catch (error: any) {
        console.log("Error in GET_PRODUCTS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        await Section.find();
        const { productId } = req.params;

        // Check if productId is present
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required",
                data: null,
            });
        }

        // Find the product by productId
        const product = await Product.findById(productId).populate([{
                path: 'author',
                model: 'User',
            },
            {
                path: 'image',
                model: 'File'
            },
            {
                path: 'productSections',
                model: 'Section',
                populate:{
                    path:'video',
                    model:'File'
                }
            }
        ]).exec();

        console.log(product)

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product fetched successfully",
            data: product,
        });

    } catch (error: any) {
        console.log("Error in GET_PRODUCT controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const getInstructorProducts = async (req: Request, res: Response) => {
    try {
        const { _id:userId } = req.body.user;

        const allproducts = await Product.find({ author: userId }).populate('image').exec();
        const courses = await Product.find({ author: userId,productType: productTypes.course }).populate('image').exec();
        const events = await Product.find({ author: userId ,productType: productTypes.event }).populate('image').exec();


        return res.status(200).json({
            success: true,
            error: false,
            message: "Instructor products fetched successfully",
            data: {
                allproducts,
                courses,
                events,
            },
        });

    } catch (error: any) {
        console.log("Error in GET_INSTRUCTOR_PRODUCTS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const getPurchasedProducts = async (req: Request, res: Response) => {
    try {
        const { _id:userId } = req.body.user;

        // Find the user by userId

        const user = await User.findById(userId).populate({
            path: 'purchases',
            populate: { path: 'image' }
        }).exec();
        const courseUser = await User.findById(userId).populate({
            path: 'purchases',
            match: { productType: productTypes.course },
            populate: { path: 'image' }
        }).exec();
        const eventUser = await User.findById(userId).populate({
            path: 'purchases',
            match: { productType: productTypes.event },
            populate: { path: 'image' }
        }).exec();

        // Check if user exists
        if (!user || !courseUser || !eventUser) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found",
                data: null,
            });
        }

        const purchasedProducts = {
            all: user.purchases,
            courses: courseUser.purchases,
            events: eventUser.purchases,
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Purchased courses fetched successfully",
            data: purchasedProducts,
        });

    } catch (error: any) {
        console.log("Error in GET_PURCHASED_COURSES controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}