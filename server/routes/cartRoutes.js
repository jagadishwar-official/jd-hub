
const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
} = require("../controllers/cartController");

const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

router.get("/", verifyFirebaseToken, getCart);
router.post("/", verifyFirebaseToken, addToCart);
router.put("/:productId", verifyFirebaseToken, updateCartQuantity);
router.delete("/:productId", verifyFirebaseToken, removeFromCart);

module.exports = router;
