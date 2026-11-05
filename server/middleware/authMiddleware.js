
const { getAuth } = require("firebase-admin/auth");
const User = require("../models/User");
const firebaseApp = require("../config/firebase");

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decodedToken = await getAuth(firebaseApp).verifyIdToken(token);

        const user = await User.findOne({
            firebaseUid: decodedToken.uid
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyUser;
