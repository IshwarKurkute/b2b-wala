const express = require("express");
const router = express.Router();

const {

    placeOrder,
    getOrdersByWholesaler,
    getOrdersByRetailer,
    acceptOrder,
    rejectOrder,
    assignDriver,
    getOrdersByDriver,
    outForDelivery

} = require("../controllers/orderController");

// ==========================
// Place Order
// ==========================

router.post("/place", placeOrder);

// ==========================
// Wholesaler
// ==========================

router.get("/wholesaler/:id", getOrdersByWholesaler);

// ==========================
// Retailer
// ==========================

router.get("/retailer/:id", getOrdersByRetailer);

// ==========================
// Accept / Reject
// ==========================

router.put("/accept/:id", acceptOrder);

router.put("/reject/:id", rejectOrder);

// ==========================
// Assign Driver
// ==========================

router.put("/assign-driver/:id", assignDriver);

// ==========================
// Driver Orders
// ==========================

router.get("/driver/:id", getOrdersByDriver);

// ==========================
// Out For Delivery
// ==========================

router.put("/out-for-delivery/:id", outForDelivery);

module.exports = router;