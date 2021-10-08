// REACT
import React from "react";

// ESTILOS
import "./style.css";

// REACT
import { useEffect } from "react";

// COMPONENTES
import Cheems from "../components/cheems";

const App = () => {
  useEffect(() => {
    fetch("https://cheemsify.netlify.app/.netlify/functions/cheemsify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        text: "Hola",
      },
    })
      .then((data) => data.json())
      .then(({ cheemsifiedText }) => console.log(cheemsifiedText))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <div id="info">
        <h1>Chemsificador v1</h1>
        <p>Chemsificar palabras y frases aleatorias</p>
      </div>
      <form>
        {/* INPUTS */}
        <input placeholder="Nombra a tu cheems" />
        <textarea placeholder="Escribe aqui tu frase..." />

        {/* BOTONES */}
        <div>
          <button type="button">
            <span className="material-icons">shuffle</span>
            Frase aleatoria
          </button>
          <button type="submit">
            <span className="material-icons">send</span>
            Chemsificar
          </button>
        </div>
      </form>
      <Cheems />
    </main>
  );
};

export default App;
