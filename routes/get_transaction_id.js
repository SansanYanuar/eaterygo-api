const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Fungsi untuk generate ID Transaksi
const generateTransactionID = async () => {
  return new Promise((resolve, reject) => {
    const prefix = `POS-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}-`;

    const query = `SELECT ID_TRANSAKSI FROM penjualan_makanan WHERE ID_TRANSAKSI LIKE ? ORDER BY ID_TRANSAKSI DESC LIMIT 1`;
    const likePrefix = `${prefix}%`;

    db.query(query, [likePrefix], (err, results) => {
      if (err) return reject(err);

      let newNumber = 1;
      if (results.length > 0) {
        const lastID = results[0].ID_TRANSAKSI;
        const lastNumber = parseInt(lastID.slice(-4), 10);
        newNumber = lastNumber + 1;
      }

      const newNumberPadded = newNumber.toString().padStart(4, "0");
      resolve(prefix + newNumberPadded);
    });
  });
};

// Endpoint untuk mendapatkan ID Transaksi baru
router.get("/", async (req, res) => {
  try {
    const ID_TRANSAKSI = await generateTransactionID();
    res.status(200).json({ success: true, ID_TRANSAKSI });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan: " + error.message });
  }
});

module.exports = router;
