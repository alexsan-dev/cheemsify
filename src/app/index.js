// REACT
import React from "react";

// ESTILOS
import "./style.css";

// COMPONENTES
import Cheems from "../components/cheems";

const App = () => {
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
