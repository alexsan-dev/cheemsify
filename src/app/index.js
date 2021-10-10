// REACT
import React, { useState } from "react";

// ESTILOS
import "./style.css";

// COMPONENTES
import Cheems from "../components/cheems";

import { delay } from "../utils/tools";

// APIS UTILIZADAS EN EL PROYECTO
// https://cheemsify.netlify.app/.netlify/functions/cheemsify
// https://cheemsify.netlify.app/.netlify/functions/phrase

const App = () => {
  // DATOS DE FORMULARIO
  const [datos, setDatos] = useState({
    text: "",
    name: "",
  });

  // DATOS DE CHEEMS
  const [cheems, setCheems] = useState({
    name: "Cheems",
    text: "Ya me dio amsiedad",
    animate: false,
    loading: false,
  });

  // GUARDAR DATOS DE FORMULARIO
  const eventoTexto = (ev) => {
    const { value, name } = ev.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
  };

  // ENVIAR DATOS A API
  const eventoEnviar = async (ev) => {
    // REINICIAR ANIMACION DE MOVIMIENTO CHEEMS
    setCheems((anterior) => ({ ...anterior, loading: true, animate: false }));

    // EVITAR QUE EL FORMULARIO SE RECARGUE
    ev.preventDefault();

    delay(async () => {
      // PETICION PARA CHEEMSIFICAR LOS TEXTOS
      const peticion = await fetch("/.netlify/functions/cheemsify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: datos.text }),
      });

      // ACTUALIZAR TEXTOS CHEEMSIFICADOS
      const json = await peticion.json();
      setCheems({
        text: json.cheemsifiedText,
        name: datos.name,
        animate: true,
        loading: false,
      });
    }, 500);
  };

  // API DE FRASE
  const obtenerFrase = async () => {
    // PETICION PARA CHEEMSIFICAR LOS TEXTOS
    setCheems((anterior) => ({ ...anterior, loading: true }));

    // PETICION A API
    const peticion = await fetch("/.netlify/functions/phrase", {
      method: "GET",
    });

    // DATOS
    const json = await peticion.json();

    // ACTUALIZAR ESTADO CHEEMS CON FRASE
    setDatos((anterior) => ({ ...anterior, text: json.phrase }));

    // DETENER ANIMACION DE CARGA CHEEMS
    setCheems((anterior) => ({ ...anterior, loading: false }));
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
