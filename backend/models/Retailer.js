const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Retailer", retailerSchema);