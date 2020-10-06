const express = require("express");

const Word = require("./wordClass.js");
const server = express();
const port = process.env.PORT || 8080;

const wordList = "ord.csv";

const wordOfTheDay = new Word(wordList);

server.use(express.json());

server.use(express.static("static"));

server.get("/wordOfTheDay", (req, res) => {
  res.send(wordOfTheDay.output);
});

server.listen(port, () => {
  console.log(`Word of the day is listening at http://localhost:${port}`);
});
