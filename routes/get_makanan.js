const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `
    SELECT a.id_makanan, a.nama_makanan, b.id_kat_makanan, b.nama_kat_makanan, 
           a.harga_jual, a.keterangan 
    FROM master_makanan AS a
    INNER JOIN master_kat_makanan AS b ON a.id_kat_makanan = b.id_kat_makanan
    WHERE a.stat = 0 AND b.stat = 0
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan: " + err.message,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: results.length > 0 ? "Data ditemukan" : "Tidak ada data",
      data: results,
      meta: { total: results.length },
    });
  });
});

module.exports = router;
