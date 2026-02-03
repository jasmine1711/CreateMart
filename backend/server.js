import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// 1️⃣ Load env variables FIRST
dotenv.config();

// 2️⃣ Create app
const app = express();
const PORT = process.env.PORT || 5000;

// 3️⃣ Resolve dirname
const __dirname = path.resolve();

// 4️⃣ Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "https://create-mart-7r1l-git-main-jasmine1711s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // preflight support

// 5️⃣ Routes
app.use("/api/products", productRoutes);

// 6️⃣ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "frontend", "dist", "index.html")
    );
  });
}

// 7️⃣ Connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
