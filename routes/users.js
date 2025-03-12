const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET semua pengguna
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data", error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
