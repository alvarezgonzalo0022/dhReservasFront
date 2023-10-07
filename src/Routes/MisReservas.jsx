import React, { useEffect, useState } from "react";
import { useContext } from "react";
import CardReserva from "../Components/CardReserva";
import { ContextGlobal } from "../Components/Utils/global.context";
import "./MisReservasStyles.css";
import { useLocation } from "react-router-dom";

const MisReservas = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { usuario } = useContext(ContextGlobal);
  const [reservas, setReservas] = useState([]);
  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/clientes")
        .then((res) => res.json())
        .then((data) =>
          data.map((cliente) => {
            if (cliente.email === usuario.email) {
              try {
                fetch(
                  `https://dhreservas-bd190ac8106b.herokuapp.com/reservas/listarReservasPorIdUsuario/${cliente.idUsuario}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setReservas(data);
                  });
              } catch (error) {
                console.error(error);
              }
            }
          })
        );
    } catch (error) {
      console.error(error);
    }
  }, []);
  // console.log(reservas);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {reservas?.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="acomodarCargador">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Sus reservas se estan cargando o no tiene reservas hechas.</p>
            </div>
            <div className="cargadorReservas"></div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "40px 0px 0px 0px" }}>
          <h1 className="tituloMisReservas">Mis reservas</h1>
          <div className="listCardReservas">
            {reservas?.map((reserva) => (
              <CardReserva reservaObjeto={reserva} key={reserva.idReserva} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MisReservas;
