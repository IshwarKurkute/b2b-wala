const express = require("express");
const router = express.Router();

const {

    placeOrder,
    getOrdersByWholesaler,
    acceptOrder,
    rejectOrder

} = require("../controllers/orderController");

// ==========================
// Place Order
// ==========================

router.post("/place", placeOrder);

// ==========================
// Get Orders By Wholesaler
// ==========================

router.get("/wholesaler/:id", getOrdersByWholesaler);

// ==========================
// Accept Order
// ==========================

router.put("/accept/:id", acceptOrder);

// ==========================
// Reject Order
// ==========================

router.put("/reject/:id", rejectOrder);

module.exports = router;