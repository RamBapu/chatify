import express from "express";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getAllChatPartners,
} from "../controllers/message.controller.js";
// import { connectDB } from "../lib/db.js";

const router = express.Router();

// // For serverless functions - deployed in Vercel
// router.use(
//   app.use(async (req, res, next) => {
//     await connectDB();
//     next();
//   }),
// );

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.

router.use(arcjetProtection);

router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getAllChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
