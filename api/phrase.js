exports.handler = async (event) => {
  // HEADERS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET",
  };

  // GET
  if (event.httpMethod.toUpperCase() === "GET") {
    const phrases = [
      "Oigan, si querían estar solos nada más tenían que decírmelo, ¿de acuerdo?.",
      "¿Trabajando duro o durando en el trabajo?",
      "Me juzgan sin ni siquiera conocerme",
      "Porque eso hacen los amigos, los amigos siempre se perdonan",
      "El verdadero amor no me sacó de esa torre, fui yo, yo misma me salvé",
      "Que alguien me traiga algo frito cubierto con chocolate",
      "Tal vez no funcione en burros",
      "Por ti baby sería Batman",
      "Que tan encantador puedo ser si tengo que fingir que soy ese horrible ogro",
      "Y él decía que eres verde y feo",
      "Pase lo que pase no debo llorar",
      "Nuestra misión imposible resultó ser imposible",
      "Bromeas, es un papucho",
      "Hogar dulce hogar",
      "No te enogres conmigo",
      "¿Ya mero llegamos?",
      "No me arremedes",
      "No soy burro lo que pasa es que me aburro",
      "Mejor afuera que adentro",
      "En mi cuarto nómas me dejaron un shampoo",
      "Yo sí cambié por ti Shrek, piensa en eso",
      "Voy a romper mi dieta, ya estarás contento",
      "O prefieres unos tacos qué quieres",
      "Todo el que te conoce te quiere hacer carnita",
      "El papel del animal latoso que habla ya me lo dieron a mí",
      "No me señales con esos sucios dedos verdes de salchicha",
      "Flores azules, espinas rojas",
    ];

    // RANDOM
    const randomIndex = Math.round(Math.random() * phrases.length - 1);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Success",
        phrase: phrases[randomIndex],
      }),
    };
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
};
