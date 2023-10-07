import React, { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./BuscadorStyles.css";
import CalendarPhone from "./CalendarPhone";
import { ContextGlobal } from "./Utils/global.context";
import Select from "react-select";
import { components } from "react-select";

const Buscador = () => {
  const { setInListAutosUbi, setInQuitarFiltro } = useContext(ContextGlobal);
  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <span className="material-symbols-outlined iconoBuscadorOpcion">
        location_on
      </span>
      <div>
        <p style={{ fontWeight: 700 }}>{props.data.label}</p>
        <p className="selectPais">{props.data.pais}</p>
      </div>
    </Option>
  );
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {props.data.label}, {props.data.pais}
    </components.SingleValue>
  );
  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      <FontAwesomeIcon icon={faLocationDot} className="iconoBuscador" />{" "}
      {children}
    </components.Control>
  );
  const [dataCiudades, setDataCiudades] = useState([]);
  useEffect(() => {
    try {
      fetch(
        "https://dhreservas-bd190ac8106b.herokuapp.com/ciudades"
      )
        .then((res) => res.json())
        .then((data) => setDataCiudades(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [dataBuscador, setDataBuscador] = useState({
    ubicacion: "",
    checkIn: "",
    checkOut: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(dataBuscador.checkIn)
    // console.log(dataBuscador.checkIn !== undefined && dataBuscador.checkOut !== undefined)
    // console.log(dataBuscador.ubicacion !== "" && dataBuscador.checkIn !== undefined && dataBuscador.checkOut !== undefined)
    if (
      dataBuscador.ubicacion !== "" &&
      dataBuscador.checkIn !== undefined &&
      dataBuscador.checkOut !== undefined
    ) {
      // console.log("entro primero");
      let fechaEntrada = dataBuscador.checkIn.split("/").reverse().join("-");
      let fechaSalida = dataBuscador.checkOut.split("/").reverse().join("-");
      try {
        fetch(
          `https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarPorCiudadYRangoDeFechas/${dataBuscador.ubicacion}/${fechaEntrada}/${fechaSalida}`
        )
          .then((res) => res.json())
          .then((data) => {
            setInListAutosUbi(ordenarImagenesPorTitulo(data));
            setInQuitarFiltro();
          });
      } catch (error) {
        console.error(error);
      }
    } else if (
      dataBuscador.checkIn !== undefined &&
      dataBuscador.checkOut !== undefined
    ) {
      // console.log("entro segundo");
      let fechaEntrada = dataBuscador.checkIn.split("/").reverse().join("-");
      let fechaSalida = dataBuscador.checkOut.split("/").reverse().join("-");
      try {
        fetch(
          `https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarPorRangoDeFechas/${fechaEntrada}/${fechaSalida}`
        )
          .then((res) => res.json())
          .then((data) => {
            setInListAutosUbi(ordenarImagenesPorTitulo(data));
            setInQuitarFiltro();
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      // console.log("entro tercero");
      try {
        fetch(
          `https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarPorCiudad/${dataBuscador.ubicacion}`
        )
          .then((res) => res.json())
          .then((data) => {
            setInListAutosUbi(ordenarImagenesPorTitulo(data));
            setInQuitarFiltro();
          });
      } catch (error) {
        console.error(error);
      }
    }
  }
  function ordenarImagenesPorTitulo(data) {
    const newData = data?.map((item) => {
      const sortedImages = item.imagenes.sort((a, b) => {
        const aIndex = parseInt(a.titulo[a.titulo.length - 1], 10);
        const bIndex = parseInt(b.titulo[b.titulo.length - 1], 10);
        return aIndex - bIndex;
      });

      return {
        ...item,
        imagenes: sortedImages,
      };
    });

    return newData;
  }
  return (
    <section className="buscador">
      <h1 className="tituloBusca">Busca tu Auto!</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <Select
          defaultValue={dataBuscador.ubicacion}
          onChange={(e) => {
            setDataBuscador({
              ...dataBuscador,
              ubicacion: e.value,
            });
          }}
          options={
            dataCiudades.length
              ? dataCiudades.map((ciudades) => ({
                  label: ciudades.nombre,
                  value: ciudades.nombre,
                  key: ciudades.idCiudad,
                  pais: ciudades.pais,
                }))
              : null
          }
          className="wrap"
          placeholder={`¿A dónde vamos?`}
          menuPosition="fixed"
          menuPlacement="bottom"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#f5c5b8",
              primary: "#f0572d",
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              boxShadow: "none",
              width: "100%",
              cursor: "pointer",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
            Option: IconOption,
            Control,
            SingleValue,
          }}
        />
        <div className="calendarioDesktopTablet">
          <Calendar funcion={setDataBuscador} variable={dataBuscador} />
        </div>
        <div className="calendarioPhone">
          <CalendarPhone funcion={setDataBuscador} variable={dataBuscador} />
        </div>
        <button className="buscar" type="submit">
          <p>Buscar</p>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </section>
  );
};

export default Buscador;
