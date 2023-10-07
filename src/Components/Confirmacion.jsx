import React from "react";
import { Link } from "react-router-dom";
import "./ConfirmacionStyles.css";

const Confirmacion = ({ idMiReserva, clienteId }) => {
  function eliminarReserva() {
    try {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com:8080/reservas/${idMiReserva}`, {
        method: "DELETE",
        body: JSON.stringify(),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="cajaEliminacionReserva">
      <h2 className="tituloEliminarReserva">Desea eliminar su reserva?</h2>
      <div>
        <p>
          En caso de que la cancelación se produzca dentro de las 24 Hs a la
          fecha y hora para retirar la unidad, se deberá abonar un cargo de
          cancelación equivalente a la tarifa de un día del auto reservado más
          4% de cargos administrativos. En los casos que soliciten deliveries de
          vehículos, cualquier modificación o cancelación del servicio deberá
          ser comunicada con al menos 24 horas de anticipación. De lo contrario
          se estará facturando el costo por los traslados, un día de alquiler,
          más 4% de cargos administrativos.
        </p>
      </div>
      <Link
        to={`/${clienteId}/reservas/eliminacionReservaExitosa`}
        className="cajaConfirmarEliminacionReserva"
      >
        <button
          className="confirmarEliminacionReserva"
          onClick={eliminarReserva}
        >
          Confirmar
        </button>
      </Link>
    </div>
  );
};

export default Confirmacion;
