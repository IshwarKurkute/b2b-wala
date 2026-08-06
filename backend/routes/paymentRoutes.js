const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {

    savePaymentSettings,
    getPaymentDetails

} = require("../controllers/paymentController");


// ===================================
// Save Payment Settings
// ===================================

router.put(

    "/settings/:id",

    upload.single("qrCode"),

    savePaymentSettings

);


// ===================================
// Get Payment Details
// ===================================

router.get(

    "/settings/:id",

    getPaymentDetails

);

module.exports = router;