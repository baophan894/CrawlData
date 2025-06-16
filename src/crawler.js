const axios = require("axios");
const cheerio = require("cheerio");
const Watchface = require("./models/Watchface");

async function crawlData() {
  const res = await axios.get("https://www.watchfacely.com/latest");
  const $ = cheerio.load(res.data);
  const results = [];

  $(".watchcellcard").each((_, el) => {
    const title = $(el).find(".text-block-2").first().text().trim();
    const imageUrl = $(el).find("img").first().attr("src");
    const detailUrl = "https://www.watchfacely.com" + $(el).find("a").first().attr("href");
    const downloadLink = $(el).find(".column-6 a").eq(1).attr("href");

    const item = { title, imageUrl, detailUrl, downloadLink };
    results.push(item);

    
    Watchface.findOneAndUpdate(
      { detailUrl },        
      item,                 
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).catch((err) => console.error("❌ Save error:", err.message));
  });

  console.log("✅ Crawled and saved:", results.length, "items");
  return results;
}

module.exports = { crawlData };
