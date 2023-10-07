import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Vector from "../img/Vector.png";
import "./CardReservaStyles.css";
import Confirmacion from "./Confirmacion";

const CardReserva = ({ reservaObjeto }) => {
  const [producto, setProducto] = useState([]);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);
  function cartelConfirmacion() {
    if (confirmarEliminacion) {
      setConfirmarEliminacion(false);
    } else {
      setConfirmarEliminacion(true);
    }
  }
  useEffect(() => {
    try {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com:8080/productos/${reservaObjeto.producto}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(ordenarImagenesPorTituloSolo(data));
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  function ordenarImagenesPorTituloSolo(data) {
    // Copiamos el objeto para no modificar el original
     data.imagenes.sort((a, b) => {
         const lastDigitA = parseInt(a.titulo.slice(-1));
         const lastDigitB = parseInt(b.titulo.slice(-1));
         return lastDigitA - lastDigitB;
     });
 
     return data;
 }

  return confirmarEliminacion ? (
    <div className="cardEliminarMisReservas">
      <Confirmacion idMiReserva={reservaObjeto.idReserva} clienteId={reservaObjeto.cliente}/>
      <button className="cancelarEliminacion" onClick={cartelConfirmacion}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  ) : (
    <div className="cardMisReservas">
      <div className="cajaImagen">
        <img
          src={producto?.imagenes?.[0]?.image}
          alt={producto?.imagenes?.[0]?.titulo}
          className="imagenAuto"
        />
      </div>
      <div className="cajaInfo">
        <div className="catNom">
          <p>{producto?.categoria?.titulo} </p>
          <h2>{producto?.titulo}</h2>
        </div>
        <div className="icoUbi">
          <img src={Vector} alt="iconoVector" />
          <p>
            {producto?.ciudad?.nombre} , {producto?.ciudad?.pais}
          </p>
        </div>
        <div style={{ width: "90%" }}>
          <div>
            <div className="cajasMisReservasCheck">
              <p style={{ fontWeight: "700" }}>Check in</p>
              {reservaObjeto?.fechaInicialReserva === undefined ? (
                <p className="cargarReservas">
                  <span>____</span>/<span>____</span>/<span>____</span>
                </p>
              ) : (
                <p className="cargarReservas">
                  {reservaObjeto?.fechaInicialReserva}
                </p>
              )}
            </div>
            <div className="cajasMisReservasCheck">
              <p style={{ fontWeight: "700" }}>Check out</p>
              {reservaObjeto?.fechaFinalReserva === undefined ? (
                <p className="cargarReservas">
                  <span>____</span>/<span>____</span>/<span>____</span>
                </p>
              ) : (
                <p className="cargarReservas">
                  {reservaObjeto?.fechaFinalReserva}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "500" }}>
            Hora de llegada: {reservaObjeto?.horaComienzoReserva}
          </p>
        </div>
        <button className="eliminarMiReserva" onClick={cartelConfirmacion}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardReserva;