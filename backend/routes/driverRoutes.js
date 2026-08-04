const express = require("express");
const router = express.Router();

const {
    registerDriver,
    getDrivers
} = require("../controllers/driverController");

// Register Driver
router.post("/register", registerDriver);

// Get Drivers By Wholesaler
router.get("/wholesaler/:id", getDrivers);

module.exports = router;