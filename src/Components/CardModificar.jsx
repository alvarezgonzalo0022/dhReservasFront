import React from 'react'
import Vector from "../img/Vector.png";
import "./CardModificarStyles.css"

const CardModificar = ({ autoObjeto }) => {
  return (
    <div className="cardProductosModificarCaja">
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
      </div>
    </div>
  )
}

export default CardModificar