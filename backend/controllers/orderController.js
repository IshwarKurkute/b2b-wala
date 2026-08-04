const Order = require("../models/Order");

// ==========================
// Place Order
// ==========================

const placeOrder = async (req, res) => {

    try {

        const {
            wholesalerId,
            retailerId,
            productId,
            quantity,
            price
        } = req.body;

        const totalAmount = quantity * price;

        const order = new Order({

            wholesalerId,
            retailerId,
            productId,
            quantity,
            price,
            totalAmount

        });

        await order.save();

        res.status(201).json({

            success: true,
            message: "Order Placed Successfully",
            order

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
// Get Orders By Wholesaler
// ==========================

const getOrdersByWholesaler = async (req, res) => {

    try {

        const orders = await Order.find({
            wholesalerId: req.params.id
        })
        .populate("productId")
        .populate("retailerId");

        res.status(200).json({

            success: true,
            orders

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
// Accept Order
// ==========================

const acceptOrder = async (req, res) => {

    try {

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: "Accepted"
            }
        );

        res.json({

            success: true,
            message: "Order Accepted"

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
// Reject Order
// ==========================

const rejectOrder = async (req, res) => {

    try {

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: "Rejected"
            }
        );

        res.json({

            success: true,
            message: "Order Rejected"

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
// Exports
// ==========================

module.exports = {

    placeOrder,
    getOrdersByWholesaler,
    acceptOrder,
    rejectOrder

};