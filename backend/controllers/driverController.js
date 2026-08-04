const Driver = require("../models/Driver");

// ==========================
// Register Driver
// ==========================

const registerDriver = async (req, res) => {

    try {

        const {
            wholesalerId,
            name,
            mobile,
            vehicleNumber,
            vehicleType,
            password
        } = req.body;

        const existingDriver = await Driver.findOne({ mobile });

        if (existingDriver) {

            return res.status(400).json({

                success: false,
                message: "Mobile Already Registered"

            });

        }

        const driver = new Driver({

            wholesalerId,
            name,
            mobile,
            vehicleNumber,
            vehicleType,
            password

        });

        await driver.save();

        res.status(201).json({

            success: true,
            message: "Driver Added Successfully"

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
// Get Drivers By Wholesaler
// ==========================

const getDrivers = async (req, res) => {

    try {

        const drivers = await Driver.find({

            wholesalerId: req.params.id

        });

        res.json({

            success: true,
            drivers

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

    registerDriver,
    getDrivers

};