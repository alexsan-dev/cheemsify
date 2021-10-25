// REACT
import React, { useEffect, useState } from "react";

// ESTILOS
import "./style.css";

// ASSETS
import CheemsImage from "../../assets/cheems.png";
import Loading from "../../assets/loading.gif";
import Blob1 from "../../assets/blob1.svg";
import Blob2 from "../../assets/blob2.svg";

const Cheems = ({ text, animate, loading, name }) => {
  const [dialog, setDialog] = useState("");
  const [move, setMove] = useState("");

  useEffect(() => {
    if (animate) setMove("move");
  }, [animate]);

  const endMove = () => setMove("notMove");

  useEffect(() => {
    setDialog("animDialog");
  }, [text]);

  const endFloat = () => setDialog("float");

  return (
    <>
      <div id="blob1">
        <img src={Blob1} alt="Blob" />
      </div>
      <div id="blob2">
        <img src={Blob2} alt="Blob2" />
      </div>
      <div id="cheems">
        <p
          className={dialog}
          onAnimationEnd={endFloat}
          style={{
            width: text.length > 20 ? "450px" : "300px",
          }}
        >
          <b>{name} says:</b>
          {text && <span>- "{text}"</span>}
        </p>
        {loading && <img src={Loading} alt="Loading" id="loading" />}
        <img
          className={move}
          onAnimationEnd={endMove}
          src={CheemsImage}
          id="dog"
          alt="Cheems"
        />
      </div>
    </>
  );
};

Cheems.defaultProps = {
  text: "I want a burmger",
  animate: true,
  loading: false,
  name: "Cheems",
};

export default Cheems;
