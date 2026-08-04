const Retailer = require("../models/Retailer");

// =======================
// Retailer Register
// =======================
exports.registerRetailer = async (req, res) => {

    try {

        const {
            shopName,
            ownerName,
            mobile,
            password,
            address
        } = req.body;

        // Mobile already exists?
        const existingRetailer = await Retailer.findOne({ mobile });

        if (existingRetailer) {
            return res.status(400).json({
                success: false,
                message: "Mobile Number Already Registered"
            });
        }

        // Create new retailer
        const retailer = new Retailer({
            shopName,
            ownerName,
            mobile,
            password,
            address
        });

        await retailer.save();

        res.status(201).json({
            success: true,
            message: "Retailer Registered Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// =======================
// Retailer Login
// =======================
exports.loginRetailer = async (req, res) => {

    try {

        const { mobile, password } = req.body;

        const retailer = await Retailer.findOne({ mobile });

        if (!retailer) {
            return res.status(400).json({
                success: false,
                message: "Retailer not found"
            });
        }

        if (retailer.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            retailer
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};