import express from "express";
const router = express.Router();

import { updateProfile } from "../controllers/User";
import { auth } from "../middlewares/auth";
import { uploadFile } from "../middlewares/cloudinaryUpload";


// Route for update profile
router.put("/updateProfile", auth, uploadFile, updateProfile);

export default router;