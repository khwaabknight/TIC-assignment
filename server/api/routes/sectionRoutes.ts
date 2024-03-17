import express from "express";
const router = express.Router();

import { createSection, updateSection, deleteSection } from "../controllers/Section";
import { auth, isAdmin } from "../middlewares/auth";
import { uploadFile } from "../middlewares/cloudinaryUpload";


// Route for create section
router.post("/createSection", auth, uploadFile , isAdmin, createSection);

// Route for update section
router.put("/updateSection", auth, uploadFile, isAdmin, updateSection);

// Route for delete section
router.delete("/deleteSection/:sectionId", auth, isAdmin, deleteSection);

export default router;
