const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const makananRoutes = require("./routes/get_makanan");
const transactionRoutes = require("./routes/get_transaction_id");
const salesRoutes = require("./routes/get_sales");
const salesItemRoutes = require("./routes/get_sales_item");

const addSalesRoutes = require("./routes/add_sales");
const addSalesItemRoutes = require("./routes/add_sales_item");

const penjualanRoutes = require("./routes/get_penjualan");
const RekapPenjualanRoutes = require("./routes/rekap_penjualan");
const rekapPerTokoRoutes = require("./routes/get_rekap_per_toko");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/makanan", makananRoutes);
app.use("/api/transaction-id", transactionRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/sales-item", salesItemRoutes);
app.use("/api/add-sales", addSalesRoutes);
app.use("/api/add-sales-item", addSalesItemRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/rekap-penjualan", RekapPenjualanRoutes);
app.use("/api/rekap-per-toko", rekapPerTokoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 EateryGo API is running on Vercel!");
});

module.exports = app;

//kalo masih lokal pakai yang di bawah

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
 */