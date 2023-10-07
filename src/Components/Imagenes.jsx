import React from "react";
import "./ImagenesStyles.css";

const Imagenes = ({ url }) => {
  return (
    <section className="imagenSeleccionado">
      <div className="urlImagenSeleccionado">
        <input
          type="text"
          className="inputsCrear achicarLetra"
          value={url}
          disabled
        />
      </div>
      <div className="cajaAtributoInvisible"></div>
    </section>
  );
};

export default Imagenes;
