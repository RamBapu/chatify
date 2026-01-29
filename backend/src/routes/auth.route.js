import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.status(200).json({ message: "Signup endpoint" });
});

export default router;
