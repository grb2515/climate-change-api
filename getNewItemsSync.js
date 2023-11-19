const cheerio = require("cheerio");
const sources = require("./sources.json");
const getPageHtml = require("./getPageHtml.js");

const articles = [];

function getNewsItems(callback, sourceName) {
  let filteredSources = sources;

  if (sourceName) {
    filteredSources = sources.filter((source) => source.name === sourceName);
  }

  filteredSources.forEach((source) => {
    getPageHtml(source)
      .then((html) => {
        const $ = cheerio.load(html);

        console.log($("title").text());
        // const searchString = "span:contains('climate')";
        const searchString = "a[aria-label*='climate']";

        $(searchString, html).each(function () {
          const title = $(this).attr("aria-label");
          let url = $(this).attr("href");
          if (!url.startsWith("https:")) url = source.baseURL + url;

          articles.push({ title, url });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  console.log(`count: ${articles.length}`);
  callback(articles);
}

module.exports = getNewsItems;
