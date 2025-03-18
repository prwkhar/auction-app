import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, // Allow entire frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
