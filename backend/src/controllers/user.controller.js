import moment from "moment";
import asyncHandler from "express-async-handler";

import { pool } from "../config/db.config.js";

import {
  generateToken,
  generateCode,
  hashPassword,
  sendEmailVerification,
} from "../utils/auth.util.js";
import e from "express";

// @route   GET /user/me
// @access  Private
const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export { me };
