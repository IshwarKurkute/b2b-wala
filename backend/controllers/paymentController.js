const Wholesaler = require("../models/Wholesaler");

// ==========================
// Save Payment Settings
// ==========================

const savePaymentSettings = async (req, res) => {

    try {

        const { upiId } = req.body;

        const wholesaler = await Wholesaler.findById(req.params.id);

        if (!wholesaler) {

            return res.status(404).json({

                success: false,
                message: "Wholesaler Not Found"

            });

        }

        wholesaler.upiId = upiId;

        if (req.file) {

            wholesaler.qrCode = req.file.filename;

        }

        await wholesaler.save();

        res.json({

            success: true,
            message: "Payment Details Saved Successfully",
            wholesaler

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ==========================
// Get Payment Details
// ==========================

const getPaymentDetails = async (req, res) => {

    try {

        const wholesaler = await Wholesaler.findById(req.params.id);

        if (!wholesaler) {

            return res.status(404).json({

                success: false,
                message: "Wholesaler Not Found"

            });

        }

        res.json({

            success: true,

            upiId: wholesaler.upiId,

            qrCode: wholesaler.qrCode

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

module.exports = {

    savePaymentSettings,
    getPaymentDetails

};