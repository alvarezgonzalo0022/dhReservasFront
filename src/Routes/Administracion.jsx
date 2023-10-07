import React from "react";
import { useState } from "react";
import AgregarProductoAdmin from "../Components/AgregarProductoAdmin";
import "./AdministracionStyles.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import EliminarProductoAdmin from "../Components/EliminarProductoAdmin";
import ModificarProductoAdmin from "../Components/ModificarProductoAdmin";
import { useContext } from "react";
import { ContextGlobal } from "../Components/Utils/global.context";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const Administracion = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [crearProducto, setCrearProducto] = useState(true);
  const [modificarProducto, setModificarProducto] = useState(false);
  const [eliminarProducto, setEliminarProducto] = useState(false);
  function cambiarACrearProducto() {
    setCrearProducto(true);
    setModificarProducto(false);
    setEliminarProducto(false);
  }
  function cambiarAModificarProducto() {
    setCrearProducto(false);
    setModificarProducto(true);
    setEliminarProducto(false);
  }
  function cambiarAEliminarProducto() {
    setCrearProducto(false);
    setModificarProducto(false);
    setEliminarProducto(true);
  }
  const {
    login
  } = useContext(ContextGlobal);
  let decoded;
  if (login) {
    decoded = jwt_decode(login);
  } else {
    navigate("/home")
  }

  return decoded?.authorities?.includes("Admin") ? 
    <div style={{height: "100%", backgroundColor:"rgba(84, 87, 118, 0.1)", width: "100%"}}>
      <div className="bloqueHeaderAdministracion padding">
          <p>Administración</p>
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
      <div className="administracion">
        <h1 className="tituloAdmin">
          <span onClick={cambiarACrearProducto}>Crear producto</span> /{" "}
          <span onClick={cambiarAModificarProducto}>Modificar producto</span> /
          <span onClick={cambiarAEliminarProducto}>Eliminar producto</span>
        </h1>
        {crearProducto ? <AgregarProductoAdmin /> : ""}
        {eliminarProducto ? <EliminarProductoAdmin/> : ""}
        {modificarProducto ? <ModificarProductoAdmin/> : ""}
      </div>
    </div>
  : <Navigate to="/home" />
};

export default Administracion;
