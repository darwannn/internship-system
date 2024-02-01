import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { pool } from "../config/db.config.js";
const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403);
    throw new Error("Not authorized. No token");
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const [rows] = await pool.query("SELECT * FROM users WHERE userId = ?", [
        data.id,
      ]);
      req.user = rows[0];
      next();
    } catch (error) {
      res.status(403);
      throw new Error(
        "Expired token. Please refresh the page or click the logout buton then login"
      );
    }
  }
});

export { authMiddleware };
