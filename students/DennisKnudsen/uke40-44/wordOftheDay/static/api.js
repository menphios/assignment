const getWord = async () => {
  const response = await fetch("/wordOfTheDay");
  const word = response.json();
  return word;
};
const wordToDOM = (wordObject) => {
  document.getElementById("word").innerHTML = wordObject.word;
  document.getElementById("explainer").innerHTML = wordObject.explainer;
};

document.addEventListener("DOMContentLoaded", function () {
  getWord().then((res) => {
    wordToDOM(res);
  });
});
