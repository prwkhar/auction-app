import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config({ path: "./env" });

connectDb()
  .then(() => {
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      },
    });

    app.locals.io = io;

    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      socket.on("joinAuction", (auctionId) => {
        socket.join(auctionId);
        console.log(`Socket ${socket.id} joined auction ${auctionId}`);
      });
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
