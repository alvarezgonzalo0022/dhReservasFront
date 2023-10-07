import React from "react";
import "./AtributosStyles.css"

const Atributos = ({nombre , icono, }) => {
  return (
    <section className="atributoSeleccionado" >
      <div className="cajasInputsAtributos">
      <div className="nombreAtributo">
        <label className="achicarLetra">Nombre</label>
        <input
          type="text"
          value={nombre}
          disabled
          className="inputsCrear achicarLetra"
        />
      </div>
      <div className="iconoAtributo">
        <label className="achicarLetra">Ícono</label>
        <input
          type="text"
          className="inputsCrear achicarLetra"
          value={icono}
          disabled
          placeholder={`<span className="material-symbols-outlined volver">arrow_back_ios_new</span>`}
        />
      </div>
      </div>
      <div className="cajaAtributoInvisible">

      </div>
    </section>
  );
};

export default Atributos;
