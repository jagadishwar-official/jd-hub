
const express = require("express");
const crypto = require("crypto");

const Order = require("../models/Order");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");
const verifyUser = require("../middleware/authMiddleware");

const router = express.Router();

// Create Razorpay Order
router.post("/create-order", verifyUser, async (req, res) => {
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

            if (!Number.isInteger(item.quantity) || item.quantity < 1 ||
                product.stock < item.quantity) {
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

        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: "order_" + Date.now()
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            customer,
            totalAmount,
            paymentMethod: "Razorpay",
            paymentStatus: "Pending",
            razorpayOrderId: razorpayOrder.id,
            status: "placed"
        });

        res.status(201).json({
            success: true,
            order: razorpayOrder,
            dbOrderId: order._id
        });

    } catch (error) {
        console.log("Payment Order Error:", error.message);

        res.status(500).json({
            message: "Unable to create payment order"
        });
    }
});

// Verify Razorpay Payment
router.post("/verify-payment", verifyUser, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: "Payment details are missing"
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        const isValid = crypto.timingSafeEqual(
            Buffer.from(expectedSignature, "hex"),
            Buffer.from(razorpay_signature, "hex")
        );

        if (!isValid) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }

        const order = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
            userId: req.user._id,
            paymentStatus: "Pending"
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found or already paid"
            });
        }

        // Update product stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
            });
        }

        order.paymentStatus = "Paid";
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Payment successful",
            order
        });

    } catch (error) {
        console.log("Payment Verification Error:", error.message);

        res.status(500).json({
            message: "Payment verification failed"
        });
    }
});

module.exports = router;
