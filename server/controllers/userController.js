
const User = require("../models/User");
const LoginHistory = require("../models/LoginHistory");
const formatDate = require("../utils/formatDate");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name } = req.body;
        const firebaseUid = req.user.uid;
        const email = req.user.email;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Full name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const existingUser = await User.findOne({ firebaseUid });

        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already registered",
                user: existingUser
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const user = await User.create({
            firebaseUid,
            name: name.trim(),
            email: email.toLowerCase(),
            role: "user"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log("Register User Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to register user"
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User profile not found. Please register first."
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const loginHistory = await LoginHistory.create({
            userId: user._id
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            loginHistory: {
                ...loginHistory.toObject(),
                loginAtFormatted: formatDate(loginHistory.loginAt),
                logoutAtFormatted: null
            }
        });
    } catch (error) {
        console.log("Login User Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

// Logout User
const logoutUser = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const loginHistory = await LoginHistory.findOne({
            userId: user._id,
            sessionStatus: "active"
        }).sort({ loginAt: -1 });

        if (!loginHistory) {
            return res.status(404).json({
                success: false,
                message: "Active login session not found"
            });
        }

        loginHistory.logoutAt = new Date();
        loginHistory.sessionStatus = "ended";

        await loginHistory.save();

        res.status(200).json({
            success: true,
            message: "Logout successful",
            loginHistory: {
                ...loginHistory.toObject(),
                loginAtFormatted: formatDate(loginHistory.loginAt),
                logoutAtFormatted: formatDate(loginHistory.logoutAt)
            }
        });
    } catch (error) {
        console.log("Logout User Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
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

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log("Get Profile Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get user profile"
        });
    }
};

// Get Login History
const getLoginHistory = async (req, res) => {
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

        const loginHistory = await LoginHistory.find({
            userId: user._id
        }).sort({ loginAt: -1 });

        const formattedLoginHistory = loginHistory.map((history) => ({
            ...history.toObject(),
            loginAtFormatted: formatDate(history.loginAt),
            logoutAtFormatted: history.logoutAt
                ? formatDate(history.logoutAt)
                : null
        }));

        res.status(200).json({
            success: true,
            loginHistory: formattedLoginHistory
        });
    } catch (error) {
        console.log("Get Login History Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get login history"
        });
    }
};

// Export Controllers
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getLoginHistory
};
