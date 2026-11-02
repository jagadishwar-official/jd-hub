
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const firebaseApp = require("./config/firebase");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"]
}));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

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
