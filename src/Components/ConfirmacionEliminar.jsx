import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ConfirmacionEliminarStyles.css";
import Swal from "sweetalert2";
import { useState } from "react";

const ConfirmacionEliminar = ({ idProductoEliminar }) => {
  const [mensajeCargando, setMensajeCargando] = useState(false);
  const navigate = useNavigate();
  function eliminarProducto() {
    setMensajeCargando(true)
    try {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com:8080/productos/${idProductoEliminar}`, {
        method: "DELETE",
        body: JSON.stringify(),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        res.json();
        if (res.status === 200) {
          navigate("/administracion/productoEliminado");
        } else {
          Swal.fire({
            icon: "error",
            title: "Uy...",
            text: "No se pudo eliminar el producto!",
          });
          setMensajeCargando(false)
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="cajaEliminacionProducto">
      <div className={mensajeCargando ? `cajaCargadorProductoEli` : `invisible`}>
        <div className="typewriterCargadorEli">
          <p style={{ fontSize: "28px", fontWeight: "700" }}>
            Eliminando el producto
          </p>
          <div className="typewriter">
            <div className="slide123">
              <i></i>
            </div>
            <div className="paper123"></div>
            <div className="keyboard123"></div>
          </div>
        </div>
      </div>
      <h2 className="tituloEliminarProducto">Desea eliminar su producto?</h2>
      <div className="cajaConfirmarEliminacionProducto">
        <button
          className="confirmarEliminacionProducto"
          onClick={eliminarProducto}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ConfirmacionEliminar;
