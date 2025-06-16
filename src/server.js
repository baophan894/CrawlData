const express = require("express");
const connectDB = require("./database");
const Watchface = require("./models/Watchface");
const { crawlData } = require("./crawler");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/api/crawl", async (req, res) => {
  try {
    const results = await crawlData();
    res.json({ message: "Data crawled & saved successfully", count: results.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to crawl and save data" });
  }
});

app.get("/api/watchfaces", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const title = req.query.title;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };

    const skip = (page - 1) * pageSize;
    const total = await Watchface.countDocuments(filter);
    const data = await Watchface.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({
      message: "Data fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
