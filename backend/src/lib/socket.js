import http from "http";
import express from "express";
import { ENV } from "./env.js";

import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

// Creating a socket server on top of app server
const io = new Server(server, {
  cors: { origin: [ENV.CLIENT_URL], credentials: true },
});

// Apply Authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// To check whether the user is online or not
export function getRecieverSocketId(userId) {
  const sockets = userSocketMap.get(userId);
  return sockets;
}

// To identify the online users
const userSocketMap = new Map(); // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  const sockets = userSocketMap.get(userId) ?? new Set();
  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  // Emit an event to all connected users
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    const sockets = userSocketMap.get(userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) userSocketMap.delete(userId);
    }
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
