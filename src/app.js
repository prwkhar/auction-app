import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Allow your frontend URL
    credentials: true, // Allows cookies and auth headers
  }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import auctionRoutes from "./routes/auction.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auctions", auctionRoutes);

export { app };
