const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const verifyUser = require("../middleware/authMiddleware");

const router = express.Router();

// Get My Orders
router.get("/", verifyUser, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to get orders"
        });
    }
});

// Place COD Order
router.post("/", verifyUser, async (req, res) => {
    try {
        const { customer, items } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({
                message: "Please provide order details"
            });
        }

        let totalAmount = 0;
        let orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                return res.status(400).json({
                    message: "Invalid product quantity"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock`
                });
            }

            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;
        }

        totalAmount += 50;

        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            customer,
            totalAmount,
            paymentMethod: "COD",
            paymentStatus: "Pending",
            status: "placed"
        });

        // Update product stock
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
            });
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.log("Order Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to place order"
        });
    }
});

module.exports = router;