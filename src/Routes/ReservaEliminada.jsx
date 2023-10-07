import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ContextGlobal } from '../Components/Utils/global.context';

const ReservaEliminada = () => {
    const { usuario } = useContext(ContextGlobal);
    const [usuarioID, setUsuarioID] = useState();
    useEffect(() => {
      try {
        fetch("https://dhreservas-bd190ac8106b.herokuapp.com/clientes")
          .then((res) => res.json())
          .then((data) =>
            data.map((cliente) => {
              if (cliente.email === usuario.email) {
                setUsuarioID(cliente.idUsuario)
              }
            })
          );
      } catch (error) {
        console.error(error);
      }
    }, []);
    // console.log(usuarioID);
  return (
    <div className="exitoCajaPadre">
      <div className="exitoCajaHijo">
        <span className="material-symbols-rounded verificado">verified</span>
        <p className="confirmacion">Tu reserva se ha eliminado con éxito.</p>
        <Link to={`/${usuarioID}/reservas`}>
          <button className="volverAlHome">ok</button>
        </Link>
      </div>
    </div>
  )
}

export default ReservaEliminada