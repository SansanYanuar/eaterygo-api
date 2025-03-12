const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint untuk mendapatkan daftar item makanan berdasarkan ID_TRANSAKSI
router.post("/", (req, res) => {
  const { id_transaksi } = req.body;

  // Pastikan ID_TRANSAKSI tersedia
  if (!id_transaksi) {
    return res.status(400).json({ success: false, message: "ID_TRANSAKSI tidak boleh kosong" });
  }

  const query = `
    SELECT b.nama_makanan, a.qty 
    FROM penjualan_makanan_item AS a
    INNER JOIN master_makanan AS b ON a.id_makanan = b.id_makanan
    WHERE a.id_transaksi = ?
  `;

  db.query(query, [id_transaksi], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }

    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
