const Product = require("../models/products");

// ==========================
// Add Product
// ==========================

const addProduct = async (req, res) => {

    try {

        const {
            wholesalerId,
            productName,
            category,
            brand,
            price,
            stock,
            unit,
            description
        } = req.body;

        const product = new Product({
            wholesalerId,
            productName,
            category,
            brand,
            price,
            stock,
            unit,
            description,
            image: req.file ? req.file.filename : ""
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Get All Products
// ==========================

const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Get Products By Wholesaler
// ==========================

const getProductsByWholesaler = async (req, res) => {

    try {

        const { id } = req.params;

        const products = await Product.find({
            wholesalerId: id
        });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Exports
// ==========================

module.exports = {
    addProduct,
    getProducts,
    getProductsByWholesaler
};