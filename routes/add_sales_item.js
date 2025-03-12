const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint untuk menambahkan item penjualan makanan
router.post("/", (req, res) => {
  try {
    const { ID_TRANSAKSI, ID_MAKANAN, QTY } = req.body;

    // Validasi input
    if (!ID_TRANSAKSI || !ID_MAKANAN || !QTY) {
      return res.status(400).json({ success: false, message: "ID_TRANSAKSI dan ID_MAKANAN dan QTY wajib diisi" });
    }

    const query = `
      INSERT INTO penjualan_makanan_item (ID_TRANSAKSI, ID_MAKANAN, QTY) 
      VALUES (?, ?, ?)`;

    db.query(query, [ID_TRANSAKSI, ID_MAKANAN,QTY], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Gagal menyimpan data: " + err.message });
      }
      res.status(201).json({ success: true, message: "Data berhasil disimpan", insertedId: result.insertId });
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server: " + error.message });
  }
});

module.exports = router;
