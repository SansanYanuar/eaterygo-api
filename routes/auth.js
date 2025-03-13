const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/login", (req, res) => {
  const { user_name, user_password } = req.body;

  // Validasi input
  if (!user_name || !user_password) {
    return res.status(400).json({ success: false, message: "Username dan password wajib diisi" });
  }

  const query = `
    SELECT user_name, user_role 
    FROM users 
    WHERE user_name = ? AND user_password = ? 
    LIMIT 1
  `;

  db.query(query, [user_name, user_password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }

    // Kirim data user tanpa password
    res.status(200).json({ success: true, user: results[0] });
  });
});

module.exports = router;
