const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint untuk mendapatkan data penjualan (header) dan detail item makanan (detail)
router.post("/", (req, res) => {
  const { start_date, end_date } = req.body;

  // Pastikan parameter tersedia
  if (!start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Tanggal tidak valid" });
  }

  // Query untuk mengambil data header penjualan
  const headerQuery = "SELECT * FROM penjualan_makanan WHERE DATE(TGL_TRANSAKSI) BETWEEN ? AND ?";

  db.query(headerQuery, [start_date, end_date], (err, headerResults) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }

    if (headerResults.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Ambil ID transaksi dari hasil header
    const transactionIds = headerResults.map(row => row.ID_TRANSAKSI);

    // Query untuk mengambil data detail makanan berdasarkan ID_TRANSAKSI
    const detailQuery = `
      SELECT a.id_transaksi, b.nama_makanan, a.qty 
      FROM penjualan_makanan_item AS a
      INNER JOIN master_makanan AS b ON a.id_makanan = b.id_makanan
      WHERE a.id_transaksi IN (?)
    `;

    db.query(detailQuery, [transactionIds], (err, detailResults) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
      }

      // Gabungkan data header dengan detailnya
      const data = headerResults.map(header => ({
        ...header,
        items: detailResults.filter(detail => detail.id_transaksi === header.ID_TRANSAKSI)
      }));

      res.status(200).json({ success: true, data });
    });
  });
});

module.exports = router;
