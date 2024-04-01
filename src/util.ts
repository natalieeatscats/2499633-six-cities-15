interface String {
  toCapitalized(): string;
}

String.prototype.toCapitalized = function () {
  const words = this.split(' ');
  const wordsToKeepLowercase = [
    'about',
    'above',
    'across',
    'after',
    'against',
    'among',
    'around',
    'before',
    'behind',
    'below',
    'beside',
    'between',
    'down',
    'during',
    'from',
    'inside',
    'into',
    'near',
    'over',
    'through',
    'towards',
    'under',
    'with',
  ];
  const wordsCased = words.map((word, index) => {
    if (index !== 0 && (word.length < 4 || wordsToKeepLowercase.includes(word))) {
      return word.toLowerCase();
    }
    const firstLetter = word.charAt(0).toUpperCase();
    const restLetters = word.slice(1).toLowerCase();
    return `${firstLetter}${restLetters}`;
  });
  return wordsCased.join(' ');
};
