import React from "react";
import { Link } from "react-router-dom";
import "./ReservaExitosaStyles.css";

const ReservaExitosa = () => {
  return (
    <div className="exitoCajaPadre">
      <div className="exitoCajaHijo">
        <span className="material-symbols-rounded verificado">verified</span>
        <p className="agradecido">¡Muchas gracias!</p>
        <p className="confirmacion">Su reserva se ha realizado con éxito</p>
        <Link to="/home">
          <button className="volverAlHome">ok</button>
        </Link>
      </div>
    </div>
  );
};

export default ReservaExitosa;
