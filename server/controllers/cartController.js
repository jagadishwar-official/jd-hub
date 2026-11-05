
const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const { productId, quantity = 1 } = req.body;

        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or quantity"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ userId: user._id });

        if (!cart) {
            cart = await Cart.create({
                userId: user._id,
                items: [{ productId, quantity }]
            });
        } else {
            const existingProduct = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
        }

        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });
    } catch (error) {
        console.log("Add to Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to add product to cart"
        });
    }
};

// Get Cart
const getCart = async (req, res) => {
    try {
        const user = await User.findOne({
            firebaseUid: req.user.uid
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cart = await Cart.findOne({
            userId: user._id
        }).populate("items.productId");

        res.status(200).json({
            success: true,
            cart: cart || { userId: user._id, items: [] }
        });
    } catch (error) {
        console.log("Get Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get cart"
        });
    }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const user = await User.findOne({
            firebaseUid: req.user.uid
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const cart = await Cart.findOne({
            userId: user._id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart
        });
    } catch (error) {
        console.log("Remove from Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to remove product from cart"
        });
    }
};

// Update Cart Quantity
const updateCartQuantity = async (req, res) => {
    try {
        const user = await User.findOne({
            firebaseUid: req.user.uid
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { quantity } = req.body;
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID or quantity"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Insufficient product stock"
            });
        }

        const cart = await Cart.findOne({
            userId: user._id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const cartItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        cartItem.quantity = quantity;

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            cart
        });
    } catch (error) {
        console.log("Update Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update cart"
        });
    }
};

// Export Controllers
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
};
