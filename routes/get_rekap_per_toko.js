const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/", (req, res) => {
  const { start_date, end_date } = req.body;

  // Validasi input tanggal
  if (!start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Tanggal tidak valid" });
  }

  const query = `
    SELECT      
        A.TOKO_PENJUALAN,
        COUNT(DISTINCT A.ID_TRANSAKSI) AS TOTAL_TRANSAKSI,
        SUM(A.TOTAL_QTY_MAKANAN) AS TOTAL_MAKANAN_TERJUAL,
        SUM(A.TOTAL_HARGA) AS TOTAL_OMZET
    FROM penjualan_makanan AS A
    WHERE DATE(A.TGL_TRANSAKSI) BETWEEN ? AND ?
    GROUP BY A.TOKO_PENJUALAN
    ORDER BY TOTAL_OMZET DESC;
  `;

  db.query(query, [start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }
    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
