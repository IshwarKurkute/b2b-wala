const express = require("express");
const router = express.Router();

const {
    registerWholesaler,
    loginWholesaler,
    getAllWholesalers
} = require("../controllers/wholesalerController");

// Register
router.post("/register", registerWholesaler);

// Login
router.post("/login", loginWholesaler);

// Get All Wholesalers
router.get("/all", getAllWholesalers);

module.exports = router;