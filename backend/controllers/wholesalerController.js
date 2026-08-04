const Wholesaler = require("../models/Wholesaler");

// ==========================
// Wholesaler Registration
// ==========================

const registerWholesaler = async (req, res) => {

    try {

        const { name, mobile, shopName, address, password } = req.body;

        const existingUser = await Wholesaler.findOne({ mobile });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Mobile Number Already Registered"
            });
        }

        const wholesaler = new Wholesaler({
            name,
            mobile,
            shopName,
            address,
            password
        });

        await wholesaler.save();

        res.status(201).json({
            success: true,
            message: "Wholesaler Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================
// Wholesaler Login
// ==========================

const loginWholesaler = async (req, res) => {

    try {

        const { mobile, password } = req.body;

        const wholesaler = await Wholesaler.findOne({ mobile });

        if (!wholesaler) {
            return res.status(400).json({
                success: false,
                message: "Mobile Number Not Registered"
            });
        }

        if (wholesaler.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            wholesaler
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
// ==========================
// Get All Wholesalers
// ==========================

const getAllWholesalers = async (req, res) => {

    try {

        const wholesalers = await Wholesaler.find({}, "-password");

        res.status(200).json({
            success: true,
            wholesalers
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    registerWholesaler,
    loginWholesaler,
    getAllWholesalers
};