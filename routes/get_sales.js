const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint untuk mendapatkan data penjualan berdasarkan rentang tanggal
router.post("/", (req, res) => {
  const { start_date, end_date } = req.body;

  // Pastikan parameter tersedia
  if (!start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Tanggal tidak valid" });
  }

  const query = "SELECT * FROM penjualan_makanan WHERE DATE(TGL_TRANSAKSI) BETWEEN ? AND ?";
  
  db.query(query, [start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }

    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
