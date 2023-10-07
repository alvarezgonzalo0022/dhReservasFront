import React from "react";
import "./CardStyles.css";
import Vector from "../img/Vector.png";
import { Link } from "react-router-dom";
const Card = ({
  identificador,
  imagen,
  categoria,
  nombre,
  ubicacion,
  descripcion,
}) => {
  
  return (
    <div className="card">
      <div className="cajaImagen">
        <img src={imagen} alt={nombre} className="imagenAuto" />
      </div>
      <div className="cajaInfo">
        <div className="catNom">
          <p>{categoria}</p>
          <h2>{nombre}</h2>
        </div>
        <div className="icoUbi">
          <img src={Vector} alt="iconoVector" />
          <p>{ubicacion}</p>
        </div>
        <div style={{ width: "90%" }}>
          <p className="info line-clamp">{descripcion}</p>
        </div>
        <Link to={`/producto/${identificador}`} className="botonVerMas">
          <button className="verMas">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Ver mas</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
