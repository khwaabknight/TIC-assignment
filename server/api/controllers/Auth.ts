import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FileType } from '../models/File';
require('dotenv').config();

export const signup = async (req: Request, res: Response) => {
    try {
        // Check if all required fields are provided
        const { name, email, password, accountType } = req.body;

        if(!name || !email || !password || !accountType) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: "Insufficient Data",
                data: null,
            });
        }

        console.log(req.body)
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: 'User already exists',
                data: null,
            });
        }
        console.log(existingUser)

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            accountType,
        });
        console.log(newUser)

        // Create token
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!, {expiresIn: "30d"});

        // Return success response
        return res.status(201).json({
            success: true,
            error: false,
            message: "User created successfully",
            data: {
                token,
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    accountType: newUser.accountType,
                    image: newUser.image,
                },
            },
        });
    } catch (error) {
        console.error("Error in SIGNUP controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // Check if all required fields are provided
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Insufficient Data",
                data: null,
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).populate('image').exec();
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: 'User does not exist',
                data: null,
            });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false,
                error: true,
                message: 'Invalid password',
                data: null,
            });
        }

        // Create token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

        // Return success response
        return res.status(200).json({
            success: true,
            error: false,
            message: "User logged in successfully",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    accountType: user.accountType,
                    image: user.image ? (user.image as FileType).url : "",
                },
            },
        });
    } catch (error) {
        console.error("Error in LOGIN controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
};
