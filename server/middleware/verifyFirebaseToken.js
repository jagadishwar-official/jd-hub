const { getAuth } = require("firebase-admin/auth");
const firebaseApp = require("../config/firebase");

const verifyFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = await getAuth(firebaseApp).verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyFirebaseToken;