import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  // userId encoded in JWT
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Setting the token in cookies - token name jwt
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: ENV.NODE_ENV === "production" ? "none" : "strict", // prevent CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
