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

app.get("/", (req, res) => {
  res.send("🚀 EateryGo API is running on Vercel!");
});

module.exports = app;

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
 */