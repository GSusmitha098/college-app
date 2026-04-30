const express = require("express");
const router = express.Router();
const db = require("../db");

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // insert new user
      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, password],
        (err, result) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "User registered successfully" });
        }
      );
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: result[0] });
    }
  );
});

module.exports = router;