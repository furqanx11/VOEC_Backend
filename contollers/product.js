//sare contollers try catch me dalna

import ErrorHandler from "../middleware/error.js";
import { Product } from "../models/product.js";

export const newProduct = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Product.create({
            title,
            description,
            user: req.user,
        });
    
        res.status(201).json({
            success: true,
            message: "Product listed successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const getAllProduct = async (req, res, next) => {

    try {
        const userid = req.user._id;

    const products = await Product.find({user: userid});

    res.status(200).json({
        success: true,
        products
    })
    } catch (error) {
        next(error);
    }
    
}

export const updateProduct = async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id);
    if(!product)
        return next(new ErrorHandler("product not found", 404));
    //product iscompleted boolean tha to jab isCompleted true ho to isCompleted false ho jayega
    product.isCompleted = !product.isCompleted;
    await product.save();

    res.status(200).json({
        success: true,
        message: "product updated successfully"
    })
    } catch (error) {
        next(error);
    }
    
}

export const deleteProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);
    
    if(!product)
        return next(new ErrorHandler());

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
    } catch (error) {
        next(error);
    }
    
}