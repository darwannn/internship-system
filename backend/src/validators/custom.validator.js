import { checkPassword } from "../utils/auth.util.js";
import { ExpressValidator } from "express-validator";
import { pool } from "../config/db.config.js";

const { check } = new ExpressValidator({
  isRegistered: async (value) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [value, value]
    );
    if (rows.length === 0) {
      throw new Error("Account does not exist");
    }
    return true;
  },
  isPasswordCorrect: async (value, { req }) => {
    const { identifier } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [identifier, identifier]
    );

    const user = rows[0];
    if (user) {
      const isPasswordValid = await checkPassword(user, value);

      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }
    }

    return true;
  },
  isEmailTaken: async (value) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      value,
    ]);
    if (rows.length > 0) {
      throw new Error("Email is already taken");
    }
    return true;
  },
  isUsernameTaken: async (value) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      value,
    ]);
    if (rows.length > 0) {
      throw new Error("Username is already taken");
    }
    return true;
  },
  isPassowrdMatch: (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password do not match");
    }
    return true;
  },
  isOldPassword: async (value, { req }) => {
    const { id, code } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userId = ? AND verificationCode = ? AND codeExpiration > NOW()",
      [id, code]
    );
    if (rows.length > 0) {
      const user = rows[0];
      if (user) {
        const isPasswordValid = await checkPassword(user, value);

        if (isPasswordValid) {
          throw new Error("Password cannot be the same as the old password");
        }
      }
    }
    return true;
  },
});

export { check };
