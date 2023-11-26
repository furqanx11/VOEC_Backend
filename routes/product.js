import express from "express";
import { deleteProduct, getAllProduct, newProduct, updateProduct } from "../contollers/product.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated, newProduct);
//all products created by user
router.get("/all",isAuthenticated, getAllProduct);

router.route("/:id").put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct);

export default router;