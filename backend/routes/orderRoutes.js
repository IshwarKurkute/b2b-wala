const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getOrdersByWholesaler,
    getOrdersByRetailer,
    acceptOrder,
    rejectOrder,
    assignDriver
} = require("../controllers/orderController");

// Place Order
router.post("/place", placeOrder);

// Wholesaler Orders
router.get("/wholesaler/:id", getOrdersByWholesaler);

// Retailer Orders
router.get("/retailer/:id", getOrdersByRetailer);

// Accept Order
router.put("/accept/:id", acceptOrder);

// Reject Order
router.put("/reject/:id", rejectOrder);

// Assign Driver
router.put("/assign-driver/:id", assignDriver);

module.exports = router;