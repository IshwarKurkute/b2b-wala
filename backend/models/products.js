const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    wholesalerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wholesaler",
        required: false
    },

    productName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    brand: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        default: "Piece"
    },

    description: {
        type: String
    },

    image: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);