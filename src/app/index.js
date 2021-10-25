// REACT
import React, { useState, useRef } from "react";

// ESTILOS
import "./style.css";

// COMPONENTES
import Cheems from "../components/cheems";

import { delay } from "../utils/tools";

// APIS UTILIZADAS EN EL PROYECTO
// https://cheemsify.netlify.app/.netlify/functions/cheemsify
// https://cheemsify.netlify.app/.netlify/functions/phrase

const App = () => {
  // REFERENCIAS
  const mainRef = useRef(null);

  // DATOS DE FORMULARIO
  const [datos, setDatos] = useState({
    text: "",
    name: "",
  });

  // DATOS DE CHEEMS
  const [cheems, setCheems] = useState({
    name: "Cheems",
    text: "I want a burmger",
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

    // SCROLL
    if (mainRef.current)
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });

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
    <main ref={mainRef}>
      <form onSubmit={eventoEnviar}>
        <div id="info">
          <h1>Cheemsify v1</h1>
          <p>Cheemsify anything you want, and have fun.</p>
        </div>
        {/* INPUTS */}
        <input
          name="name"
          onChange={eventoTexto}
          placeholder="Name your cheems"
        />
        <textarea
          name="text"
          value={datos.text}
          onChange={eventoTexto}
          placeholder="Write your phrase..."
        />

        {/* BOTONES */}
        <div id="actions">
          <button type="button" onClick={obtenerFrase}>
            <span className="material-icons">shuffle</span>
            Random phrase
          </button>
          <button type="submit">
            <span className="material-icons">send</span>
            Cheemsify
          </button>
        </div>
      </form>
      <Cheems {...cheems} />
    </main>
  );
};

export default App;
