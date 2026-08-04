const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({

    wholesalerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wholesaler",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    vehicleNumber: {
        type: String,
        required: true
    },

    vehicleType: {
        type: String,
        default: "Bike"
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Available", "Busy"],
        default: "Available"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Driver", driverSchema);