const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(

{

    orderId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true

    },

    retailerId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
        required: true

    },

    wholesalerId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Wholesaler",
        required: true

    },

    totalAmount: {

        type: Number,
        required: true

    },

    advanceAmount: {

        type: Number,
        required: true

    },

    remainingAmount: {

        type: Number,
        required: true

    },

    paymentType: {

        type: String,
        enum: ["Advance", "Final"],
        default: "Advance"

    },

    paymentMethod: {

        type: String,
        enum: ["UPI", "QR"],
        default: "UPI"

    },

    paymentStatus: {

        type: String,
        enum: [
            "Pending",
            "Advance Paid",
            "Final Pending",
            "Completed"
        ],
        default: "Pending"

    },

    transactionId: {

        type: String,
        default: ""

    },

    paidAt: {

        type: Date

    }

},

{

    timestamps: true

}

);

module.exports = mongoose.model("Payment", paymentSchema);