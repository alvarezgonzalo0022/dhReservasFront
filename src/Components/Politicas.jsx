import React from 'react'
import "../Routes/ProductoStyles.css"

const Politicas = () => {
  return (
    <div className={`politicas padding `}>
        <div className="cajaNorAut">
          <p className="tituloPolitica">Normas del auto</p>
          <ul>
            <li className="politicasTexto">No fumar</li>
            <li className="politicasTexto">No se permiten carreras</li>
            <li className="politicasTexto">Mantenerlo limpio</li>
          </ul>
        </div>
        <div className="cajaSalSeg">
          <p className="tituloPolitica">Salud y seguridad</p>
          <ul>
            <li className="politicasTexto">Detector de choque</li>
            <li className="politicasTexto">
              No arranca si no tienen el cinturon puesto
            </li>
            <li className="politicasTexto">Opcional: Asiento para bebes</li>
          </ul>
        </div>
        <div className="cajaPolCan">
          <p className="tituloPolitica">Politica de cancelacion</p>
          <ul>
            <li className="politicasTexto">
              Agregá las fechas de tu viaje para obtener los detalles de
              cancelación de este auto.
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Politicas