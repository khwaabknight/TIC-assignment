import express from "express";
const router = express.Router();

import { login, signup } from "../controllers/Auth";


// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

export default router;