const cheerio = require("cheerio");
const sources = require("./sources.json");
const getPageHtml = require("./getPageHtml.js");

async function getNewsItems(sourceName) {
  const articles = [];
  let filteredSources = sources.filter((source) => source.active);

  if (sourceName) {
    filteredSources = filteredSources.filter(
      (source) => source.name === sourceName
    );
  }

  for (const source of filteredSources) {
    const html = await getPageHtml(source);
    const sourceArticles = [];
    if (!html) continue;

    const $ = cheerio.load(html);
    const searchString = "a:contains('climate')";

    $(searchString, html).each(function () {
      const title = $(this)
        .text()
        .replace(/[\t\n]/g, "");
      let url = $(this).attr("href");
      if (!url.startsWith("https:")) url = source.baseUrl + url;

      sourceArticles.push({ source: source.name, title, url });
    });

    articles.push(...sourceArticles);
    console.log(source.name + ": " + sourceArticles.length);
  }

  console.log(`total: ${articles.length}`);
  return articles;
}

module.exports = getNewsItems;
