
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    colors: {
        type: [String],
        default: []
    },
    sizes: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
