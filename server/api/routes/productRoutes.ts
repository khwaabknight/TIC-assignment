import express from "express";
const router = express.Router();

import { addProduct, updateProduct, deleteProduct, getProducts, getProduct } from "../controllers/Product";
import { auth, isAdmin, isConsumer } from "../middlewares/auth";
import { uploadFile } from "../middlewares/cloudinaryUpload";


// Route for add product
router.post("/addproduct", auth, uploadFile ,isAdmin, addProduct);

// Route for update product
router.put("/updateproduct", auth, uploadFile, isAdmin, updateProduct);

// Route for delete product
router.delete("/deleteproduct", auth, isAdmin, deleteProduct);

// Route for get all products
router.get("/getproducts", auth, isConsumer, getProducts);

// Route for get single product
router.get("/getproduct", auth, getProduct);

export default router;