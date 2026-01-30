import express from "express";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getAllChatPartners,
} from "../controllers/message.controller.js";

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.

// todo: uncomment after finishing the project
// router.use(arcjetProtection);

router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getAllChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
