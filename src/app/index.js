// REACT
import React, { useState } from "react";

// ESTILOS
import "./style.css";

// COMPONENTES
import Cheems from "../components/cheems";

// APIS
// https://cheemsify.netlify.app/.netlify/functions/cheemsify
// https://cheemsify.netlify.app/.netlify/functions/phrase

const App = () => {
  const [datos, setDatos] = useState({
    text: "",
    name: "",
  });

  const [cheems, setCheems] = useState({
    name: "",
    text: "",
    animate: false,
    loading: false,
  });

  const eventoTexto = (ev) => {
    const { value, name } = ev.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
  };

  const eventoEnviar = async (ev) => {
    ev.preventDefault();
    const peticion = await fetch("/.netlify/functions/cheemsify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: datos.text,
      }),
    });

    const json = await peticion.json();
    setCheems({
      text: json.cheemsifiedText,
      name: datos.name,
      move: true,
    });
  };

  const obtenerFrase = async () => {
    const peticion = await fetch("/.netlify/functions/phrase", {
      method: "GET",
    });
    const json = await peticion.json();
    setDatos((anterior) => ({ ...anterior, text: json.phrase, loading: true }));
  };

  return (
    <main>
      <div id="info">
        <h1>Cheemsificador v1</h1>
        <p>Chemsificar palabras y frases aleatorias</p>
      </div>
      <form onSubmit={eventoEnviar}>
        {/* INPUTS */}
        <input
          name="name"
          onChange={eventoTexto}
          placeholder="Nombra a tu cheems"
        />
        <textarea
          name="text"
          value={datos.text}
          onChange={eventoTexto}
          placeholder="Escribe aqui tu frase..."
        />

        {/* BOTONES */}
        <div>
          <button type="button" onClick={obtenerFrase}>
            <span className="material-icons">shuffle</span>
            Frase aleatoria
          </button>
          <button type="submit">
            <span className="material-icons">send</span>
            Chemsificar
          </button>
        </div>
      </form>
      <Cheems {...cheems} />
    </main>
  );
};

export default App;
