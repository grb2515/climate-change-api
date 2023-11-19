const axios = require("axios");
const fs = require("fs").promises;
const fss = require("fs");

async function getPageHtml(source) {
  const sourceName = source.name;
  const filePath = "html/" + sourceName + ".html";
  let html;

  if (fss.existsSync(filePath)) {
    html = await fs.readFile(filePath, "utf8");
  } else {
    let response;

    try {
      response = await axios.get(source.baseUrl + source.relativeUrl);
      html = response.data;
    } catch (e) {
      if (e.response) {
        console.error(sourceName + ": " + e.response.status);
      } else {
        console.error(sourceName + ": " + e.message);
      }
    }

    if (html) {
      await fs.writeFile(filePath, html, "utf8");
      console.log(`${filePath} written successfully`);
    }
  }

  return html;
}

module.exports = getPageHtml;
