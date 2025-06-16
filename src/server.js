const express = require("express");
const connectDB = require("./database"); // 👈 Import kết nối
const { crawlData } = require("./crawler");

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.get("/api/watchfaces", async (req, res) => {
  try {
    const data = await crawlData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to crawl data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
