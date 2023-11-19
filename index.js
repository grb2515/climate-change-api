const getNewsItems = require("./getNewsItems");
const express = require("express");
const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));

app.get("/", (req, res) => {
  res.json("Welcome to my Climate Change News API");
});

app.get("/news", (req, res) => {
  getNewsItems().then((articles) => {
    res.json(articles);
  });
});

app.get("/news/:sourceName", async (req, res) => {
  const articles = await getNewsItems(req.params.sourceName);
  res.json(articles);
});

// app.get("/news/:sourceName", (req, res) => {
//   getNewsItems(req.params.sourceName).then((articles) => {
//     res.json(articles);
//   });
// });
