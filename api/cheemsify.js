export const cheemsify = (text) => {
  // REGEX
  const expr = /[aáeéiíoóuú]+[^aáeéiíoóuúmnñry]/gi;

  // LISTA DE PALABRAS
  const wordList = text.split(" ").map((word) => word + " ");
  const cheemsifiedWordList = wordList.map((word) =>
    word
      .replace(expr, (value) =>
        value.insert(value.length - 1, word.majority() === 1 ? "M" : "m")
      )
      .slice(0, -1)
  );

  // UNIR PALABRAS
  return cheemsifiedWordList.join(" ");
};

exports.handler = async (event) => {
  // GET
  if (event.httpMethod.toUpperCase() === "GET") {
    const { text } = JSON.parse(event.body);
    if (text.length() > 0) {
      const cheemsifiedText = cheemsify(text);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success", cheemsifiedText }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Empty string" }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
};
