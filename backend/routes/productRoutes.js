const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductsByWholesaler
} = require("../controllers/productController");

const upload = require("../config/multer");

// ==========================
// Add Product
// ==========================
router.post("/add", upload.single("image"), addProduct);

// ==========================
// Get All Products
// ==========================
router.get("/", getProducts);

// ==========================
// Get Products By Wholesaler
// ==========================
router.get("/wholesaler/:id", getProductsByWholesaler);

module.exports = router;