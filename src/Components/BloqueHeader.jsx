import React from "react";
import { Link } from "react-router-dom";
import "./BloqueHeaderStyles.css";
const BloqueHeader = ({ categoria, nombre }) => {
  return (
    <div className="bloqueHeader padding">
      <div>
        <p className="nombreCategoria">{categoria}</p>
        <p className="marcaCategoria">{nombre}</p>
      </div>
      <div>
      <Link to="/home">
        <button style={{ border: 0 }} className="volverHomeBloque">
          <span className="material-symbols-outlined volver">
            arrow_back_ios_new
          </span>
        </button>
      </Link>
      </div>
    </div>
  );
};

export default BloqueHeader;
