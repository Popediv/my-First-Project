import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './src/routes/authRoutes.js';
import confessionRoutes from "./src/routes/confessionRoutes.js";

dotenv.config();

const app = express();

const PORT = 4000;
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/api/confessions", confessionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

