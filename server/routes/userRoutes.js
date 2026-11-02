const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getLoginHistory
} = require("../controllers/userController");

const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

router.post("/register", verifyFirebaseToken, registerUser);
router.post("/login", verifyFirebaseToken, loginUser);
router.post("/logout", verifyFirebaseToken, logoutUser);
router.get("/profile", verifyFirebaseToken, getUserProfile);
router.get("/login-history", verifyFirebaseToken, getLoginHistory);

module.exports = router;