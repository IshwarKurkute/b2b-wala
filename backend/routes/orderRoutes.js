const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getOrdersByWholesaler,
    getOrdersByRetailer,
    acceptOrder,
    rejectOrder
} = require("../controllers/orderController");

// Place Order
router.post("/place", placeOrder);

// Wholesaler Orders
router.get("/wholesaler/:id", getOrdersByWholesaler);

// Retailer Orders
router.get("/retailer/:id", getOrdersByRetailer);

// Accept
router.put("/accept/:id", acceptOrder);

// Reject
router.put("/reject/:id", rejectOrder);

module.exports = router;