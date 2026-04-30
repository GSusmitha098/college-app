const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all colleges
router.get("/", (req, res) => {
  const { search, location, maxFees } = req.query;

  let query = "SELECT * FROM colleges WHERE 1=1";

  if (search) {
    query += ` AND name LIKE '%${search}%'`;
  }

  if (location) {
    query += ` AND location='${location}'`;
  }

  if (maxFees) {
    query += ` AND fees <= ${maxFees}`;
  }

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});



router.post("/save", (req, res) => {
  const { user_id, college_id } = req.body;

  db.query(
    "INSERT INTO saved_colleges (user_id, college_id) VALUES (?, ?)",
    [user_id, college_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Saved successfully" });
    }
  );
});

// ✅ GET saved colleges for a user
router.get("/saved/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    `SELECT c.* 
     FROM saved_colleges s 
     JOIN colleges c ON s.college_id = c.id 
     WHERE s.user_id = ?`,
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      } console.log("DB ERROR:", err);
return res.status(500).json(err);
      res.json(result);
    }
  );
});
// GET college by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM colleges WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(result[0]);
  });
});

module.exports = router;