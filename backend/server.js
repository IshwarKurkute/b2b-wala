const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const wholesalerRoutes = require("./routes/wholesalerRoutes");
const productRoutes = require("./routes/productRoutes");
const retailerRoutes = require("./routes/retailerRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("backend/uploads"));

// Routes
app.use("/api/wholesaler", wholesalerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 B2B Wala Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});