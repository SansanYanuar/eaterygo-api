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
    SELECT A.ID_TRANSAKSI, A.TGL_TRANSAKSI, D.NAMA_KAT_MAKANAN, 
           C.NAMA_MAKANAN, A.TOTAL_QTY_MAKANAN, A.TOTAL_HARGA, 
           A.TOKO_PENJUALAN, A.JENIS_LAYANAN, A.METODE_BAYAR 
    FROM penjualan_makanan AS A
    INNER JOIN penjualan_makanan_item AS B ON A.ID_TRANSAKSI = B.ID_TRANSAKSI
    INNER JOIN master_makanan AS C ON B.ID_MAKANAN = C.ID_MAKANAN
    INNER JOIN master_kat_makanan AS D ON C.ID_KAT_MAKANAN = D.ID_KAT_MAKANAN 
    WHERE DATE(A.TGL_TRANSAKSI) BETWEEN ? AND ?
    ORDER BY A.TGL_TRANSAKSI DESC
  `;

  db.query(query, [start_date, end_date], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Terjadi kesalahan: " + err.message });
    }
    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
