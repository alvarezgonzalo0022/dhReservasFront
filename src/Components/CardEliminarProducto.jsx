import React from "react";
import "./CardEliminarProductoStyles.css";
import { useState } from "react";
import ConfirmacionEliminar from "./ConfirmacionEliminar";
import Vector from "../img/Vector.png";

const CardEliminarProducto = ({ autoObjeto }) => {
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);
  function cartelConfirmacion() {
    if (confirmarEliminacion) {
      setConfirmarEliminacion(false);
    } else {
      setConfirmarEliminacion(true);
    }
  }

  return confirmarEliminacion ? (
    <div className="cardEliminarProducto">
      <ConfirmacionEliminar idProductoEliminar={autoObjeto.idProducto} />
      <button className="cancelarEliminacion" onClick={cartelConfirmacion}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  ) : (
    <div className="cardProductosEliminar">
      <div className="cajaImagen">
        <img
          src={autoObjeto?.imagenes?.[0]?.image}
          alt={autoObjeto?.imagenes?.[0]?.titulo}
          className="imagenAuto"
        />
      </div>
      <div className="cajaInfo">
        <div className="catNom">
          <p>{autoObjeto?.categoria?.titulo} </p>
          <h2>{autoObjeto?.titulo}</h2>
        </div>
        <div className="icoUbi">
          <img src={Vector} alt="iconoVector" />
          <p>
            {autoObjeto?.ciudad?.nombre} , {autoObjeto?.ciudad?.pais}
          </p>
        </div>
        <div style={{ width: "90%" }}>
          <p className="info line-clamp">{autoObjeto.descripcion}</p>
        </div>
        <button className="eliminarProducto" onClick={cartelConfirmacion}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardEliminarProducto;