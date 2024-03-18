import express from "express";
const router = express.Router();

import { getAdminAnalytics } from "../controllers/Analytics";
import { auth, isAdmin } from "../middlewares/auth";

// Route for fetching instructor analytics
router.get("/admin", auth, isAdmin, getAdminAnalytics);

export default router;