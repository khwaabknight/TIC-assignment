import express from "express";
const router = express.Router();

import { updateProfile, getUserProducts } from "../controllers/User";
import { auth } from "../middlewares/auth";
import { uploadFile } from "../middlewares/cloudinaryUpload";


// Route for update profile
router.put("/updateProfile", auth, uploadFile, updateProfile);

// Route for get user products
router.get("/getUserProducts", auth, getUserProducts);


export default router;