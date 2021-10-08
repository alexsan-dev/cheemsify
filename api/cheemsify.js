const cheemsify = (text) => {
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

exports.handler = async (event, _ctx, callback) => {
  // HEADERS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  // GET
  if (event.httpMethod.toUpperCase() === "POST") {
    const { text } = JSON.parse(event.body);
    if (text.length() > 0) {
      const cheemsifiedText = cheemsify(text);
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Success", cheemsifiedText }),
      });
    }
    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Empty string" }),
    });
  } else {
    callback(null, {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    });
  }
};
