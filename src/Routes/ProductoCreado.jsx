import React from "react";
import { Link } from "react-router-dom";

const ProductoCreado = () => {
  return (
    <div className="exitoCajaPadre">
      <div className="exitoCajaHijo">
        <span className="material-symbols-rounded verificado">verified</span>
        <p className="confirmacion">Tu producto se ha creado con éxito.</p>
        <Link to="/administracion">
          <button className="volverAlHome">ok</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductoCreado;
