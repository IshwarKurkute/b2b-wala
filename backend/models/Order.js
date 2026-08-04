const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    wholesalerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wholesaler",
        required: true
    },

    retailerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Rejected",
            "Packed",
            "Out For Delivery",
            "Delivered"
        ],
        default: "Pending"
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);