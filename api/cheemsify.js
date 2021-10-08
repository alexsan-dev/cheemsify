const cheemsify = (text) => {
  const holyWords = {
    ansiedad: "amsiedad",
    burger: "burmger",
    batman: "bamtman",
    cheese: "cheems",
    cheems: "cheems",
    cheeseburger: "cheemsburger",
    doge: "domge",
  };

  text = text.replace(/(\r\n|\n|\r)/gm, " ");
  let words = text.split(" ");
  let cheemedText = [];
  let symbols = [",", ".", ":", "!", "?", "&", "%", "/"];

  for (let i = words.length - 1; i >= 0; i--) {
    let word = words[i].trim().toLowerCase();
    let needLastCharater = false;
    let lastChar = word.charAt(word.length - 1);

    if (symbols.includes(lastChar)) {
      word = word.slice(0, -1);
      needLastCharater = true;
    }

    if (lastChar === "s") {
      let withoutS = word.slice(0, -1);

      if (holyWords[withoutS]) {
        word = holyWords[withoutS] + "s";
        cheemedText[i] = word;
        continue;
      }
    }

    if (holyWords[word]) word = holyWords[word];
    else word = cheemsAlgorithm(word);
    if (needLastCharater) word = word + lastChar;

    cheemedText[i] = word;
  }

  return cheemedText.join(" ");
};

const cheemsAlgorithm = (word) => {
  if (word.length < 4) return word;

  let vowels = ["a", "e", "i", "o", "u"];
  let vowelCount = word.match(/[aeiou]/gi);
  vowelCount = vowelCount === null ? 0 : vowelCount.length;

  let newWord = [];
  let addedM = false;
  let lastChar = word.charAt(word.length - 1);

  for (let i = 0; i < word.length; i++) {
    let char = word.charAt(i);
    if (i > 0 && addedM === false) {
      if (
        vowelCount > 1 &&
        i === 1 &&
        vowels.includes(char) &&
        !vowels.includes(lastChar)
      ) {
        newWord[i] = char;
        continue;
      }

      let prev = word.charAt(i - 1);
      let next = word.charAt(i + 1);

      if (
        vowels.includes(char) &&
        next !== "m" &&
        prev !== "m" &&
        !vowels.includes(next)
      ) {
        char = char + "m";
        addedM = true;
      }
    }

    if (newWord[i] === undefined) newWord[i] = char;
  }

  return newWord.join("");
};

exports.handler = async (event) => {
  // HEADERS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  // POST
  if (event.httpMethod.toUpperCase() === "POST") {
    const { text } = JSON.parse(event.body);
    if (text.length > 0) {
      const cheemsifiedText = cheemsify(text);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Success", cheemsifiedText }),
      };
    }
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Empty string" }),
    };
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
};
