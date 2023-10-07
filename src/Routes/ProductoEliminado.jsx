import React from "react";
import { Link } from "react-router-dom";

const ProductoEliminado = () => {
  return (
    <div className="exitoCajaPadre">
      <div className="exitoCajaHijo">
        <span className="material-symbols-rounded verificado">verified</span>
        <p className="confirmacion">Tu producto se ha eliminado con éxito.</p>
        <Link to="/administracion">
          <button className="volverAlHome">ok</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductoEliminado;
