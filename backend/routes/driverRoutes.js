const express = require("express");
const router = express.Router();

const {
    registerDriver,
    getDrivers,
    loginDriver
} = require("../controllers/driverController");

// Register Driver
router.post("/register", registerDriver);

// Driver Login
router.post("/login", loginDriver);

// Get Drivers By Wholesaler
router.get("/wholesaler/:id", getDrivers);

module.exports = router;