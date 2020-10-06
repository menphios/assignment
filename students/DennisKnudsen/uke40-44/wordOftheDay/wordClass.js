const fs = require("fs");

class Word {
  constructor(file) {
    try {
      this.dayOfTheYear = this.getDayOfTheYear();
      this.file = file;
      this.rawWordList = this.loadWordList();
      this.linesInWordList = this.rawWordList.length;
      this.lines = this.scrambleLines();
      this.output = this.formatOuput();
    } catch (err) {
      console.log(err.message);
      process.exit();
    }
  }

  loadWordList() {
    return fs
      .readFileSync(this.file, { encoding: "utf-8" })
      .toString()
      .split("\n");
  }

  scrambleLines() {
    const oddArray = [];
    const evenArray = [];

    this.rawWordList.forEach((element, index) => {
      if (index % 2 === 0) {
        evenArray.push(element);
      } else {
        oddArray.push(element);
      }
    });

    return oddArray.concat(evenArray);
  }
  getDayOfTheYear() {
    const year = new Date(Date.now()).getFullYear();
    const unixTime1Jan = new Date(`01 01 ${year}`);

    return Math.round((Date.now() - unixTime1Jan) / 86400000).toFixed(0);
  }
  getLineOfTheDay() {
    return this.lines[this.dayOfTheYear];
  }

  formatOuput() {
    const regExWord = /^(.+?),{1}/g;
    const regExExplainer = /(.+?)"{1}/g;
    const word = this.getLineOfTheDay().match(regExWord)[0].replace(",", "");
    const explainer = this.getLineOfTheDay()
      .match(regExExplainer)[1]
      .replace('"', "");
    return { word: word, explainer: explainer };
  }

  getWord() {
    return this.output;
  }
}

module.exports = Word;
