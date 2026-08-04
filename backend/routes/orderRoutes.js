const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getOrdersByWholesaler
} = require("../controllers/orderController");

// ==========================
// Place Order
// ==========================
router.post("/place", placeOrder);

// ==========================
// Get Orders By Wholesaler
// ==========================
router.get("/wholesaler/:id", getOrdersByWholesaler);

module.exports = router;