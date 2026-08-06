const mongoose = require("mongoose");

const wholesalerSchema = new mongoose.Schema(

{

    name: {

        type: String,
        required: true

    },

    mobile: {

        type: String,
        required: true,
        unique: true

    },

    shopName: {

        type: String,
        required: true

    },

    address: {

        type: String,
        required: true

    },

    password: {

        type: String,
        required: true

    },

    upiId: {

        type: String,
        default: ""

    },

    qrCode: {

        type: String,
        default: ""

    }

},

{

    timestamps: true

}

);

module.exports = mongoose.model("Wholesaler", wholesalerSchema);