
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const firebaseApp = require("./config/firebase");

const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://jd-hub.vercel.app",
        "https://jd-k4wh8x9rq-3d-webiner.vercel.app"
    ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

console.log("Firebase Admin Initialized:", !!firebaseApp);

app.get("/", (req, res) => {
    res.send("JD Hub API is running");
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Failed:", error.message);
        process.exit(1);
    }
};

startServer();
