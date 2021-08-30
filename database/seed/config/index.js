const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1,
  },
  wordsPerSentence: {
    max: 12,
    min: 4,
  },
});

module.exports = lorem;
