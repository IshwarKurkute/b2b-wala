const express = require("express");
const router = express.Router();

const {
    registerRetailer,
    loginRetailer
} = require("../controllers/retailerController");

// Register
router.post("/register", registerRetailer);

// Login
router.post("/login", loginRetailer);

module.exports = router;