const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Endpoint untuk menambahkan data penjualan
router.post("/", (req, res) => {
  const {
    ID_TRANSAKSI,
    TGL_TRANSAKSI,
    TOTAL_QTY_MAKANAN = 0,
    HARGA_SEBELUM_DISKON = 0.0,
    DISKON = 0.0,
    TOTAL_HARGA = 0.0,
    TOKO_PENJUALAN,
    JENIS_LAYANAN,
    NO_TRANSAKSI_ONLINE = null,
    METODE_BAYAR,
    PELANGGAN_BAYAR = 0.0,
    PELANGGAN_KEMBALIAN = 0.0,
    STAT = 0,
  } = req.body;

  const query = `
    INSERT INTO penjualan_makanan 
    (ID_TRANSAKSI, TGL_TRANSAKSI, TOTAL_QTY_MAKANAN, HARGA_SEBELUM_DISKON, 
    DISKON, TOTAL_HARGA, TOKO_PENJUALAN, JENIS_LAYANAN, NO_TRANSAKSI_ONLINE, 
    METODE_BAYAR, PELANGGAN_BAYAR, PELANGGAN_KEMBALIAN, STAT) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    ID_TRANSAKSI,
    TGL_TRANSAKSI,
    TOTAL_QTY_MAKANAN,
    HARGA_SEBELUM_DISKON,
    DISKON,
    TOTAL_HARGA,
    TOKO_PENJUALAN,
    JENIS_LAYANAN,
    NO_TRANSAKSI_ONLINE,
    METODE_BAYAR,
    PELANGGAN_BAYAR,
    PELANGGAN_KEMBALIAN,
    STAT,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Gagal menyimpan data: " + err.message });
    }
    res.status(201).json({ success: true, message: "Data berhasil disimpan" });
  });
});

module.exports = router;
