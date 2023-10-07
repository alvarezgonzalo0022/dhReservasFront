import React, { useContext, useEffect, useState } from "react";
import "./ProductoStyles.css";
import BloqueHeader from "../Components/BloqueHeader";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import CalendarProducto from "../Components/CalendarProducto";
import CalendarPhoneProducto from "../Components/CalendarPhoneProducto";
import CalendarDesktopProducto from "../Components/CalendarDesktopProducto";
import { ContextGlobal } from "../Components/Utils/global.context";
import Galeria from "../Components/Galeria";
import GaleriaTabletPhone from "../Components/GaleriaTabletPhone";
import Politicas from "../Components/Politicas";
import ContentLoader from "react-content-loader";
import { DateObject } from "react-multi-date-picker";

const Producto = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [cambioIcono, setCambioIcono] = useState(false);
  const [dataReserva, setDataReserva] = useState({
    checkInProducto: "",
    checkOutProducto: "",
  });
  const {
    setInListAutosUbi,
    login,
    setInMensajeLogin,
    setOutMensajeLogin,
    mensajeLogin,
  } = useContext(ContextGlobal);
  const changeMensaje = () => {
    if (mensajeLogin) setOutMensajeLogin();
    else setInMensajeLogin();
  };
  useEffect(() => {
    setInListAutosUbi([]);
  }, []);
  const { id } = useParams();
  const [dataAutoSolo, setDataAutoSolo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDataAutoSolo(ordenarImagenesPorTitulo(data));
        });
    }
    fetchData();
  }, [id]);
    // const sortedImages = dataAutoSolo.imagenes.sort((a, b) => {
    //   const aIndex = parseInt(a.titulo[a.titulo.length - 1], 10);
    //   const bIndex = parseInt(b.titulo[b.titulo.length - 1], 10);
    //   return aIndex - bIndex;
    // });

    // return {
    //   ...dataAutoSolo,
    //   imagenes: sortedImages,
    // };

    function ordenarImagenesPorTitulo(data) {
      const newData = { ...data }; // Copiamos el objeto para no modificar el original
      newData.imagenes.sort((a, b) => {
          const lastDigitA = parseInt(a.titulo.slice(-1));
          const lastDigitB = parseInt(b.titulo.slice(-1));
          return lastDigitA - lastDigitB;
      });
  
      return newData;
  }
  function ordenarImagenesPorTituloSolo(data) {
   // Copiamos el objeto para no modificar el original
    data.imagenes.sort((a, b) => {
        const lastDigitA = parseInt(a.titulo.slice(-1));
        const lastDigitB = parseInt(b.titulo.slice(-1));
        return lastDigitA - lastDigitB;
    });

    return data.imagenes;
}
  console.log(dataAutoSolo)
  function handleSubmit(e) {
    e.preventDefault();
    return;
  }

  const cambiar = () => {
    setCambioIcono(!cambioIcono);
  };
  const [imagenes, setImagenes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/${id}`)
        .then((res) => res.json())
        .then((data) => setImagenes(ordenarImagenesPorTituloSolo(data)));
    }
    fetchData();
  }, []);

  const [reservas, setReservas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/reservas/listarReservasPorIdProducto/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setReservas(
            data.map((reserva) => {
              return {
                start: new DateObject(reserva.fechaInicialReserva),
                end: new DateObject(reserva.fechaFinalReserva),
              };
            })
          )
        );
    }
    fetchData();
  }, []);

  const { galeriaImagenes, setInGaleriaImagenes, setOutGaleriaImagenes } =
    useContext(ContextGlobal);
  const galeria = galeriaImagenes === false;
  const changeGaleria = () => {
    if (galeria) {
      setOutGaleriaImagenes();
      body[0].style.overflow = "hidden";
    } else {
      setInGaleriaImagenes();
    }
  };
  const changeGaleria1 = () => {
    if (!galeria) {
      setInGaleriaImagenes();
      body[0].style.overflow = "";
    }
  };
  const body = document.getElementsByTagName("body");
  return (
    <div className="detalleProducto">
      <div
        className={`cajaOpaca ${galeria ? "desabilitado" : ""}`}
        onClick={changeGaleria1}
      ></div>
      <div className={`cajaGaleriaSinOpacity ${galeria ? "desabilitado" : ""}`}>
        {galeria ? "" : <Galeria listaImagenes={imagenes} />}
      </div>
      <BloqueHeader
        categoria={dataAutoSolo.categoria?.titulo}
        nombre={dataAutoSolo.titulo}
      />
      <div className="datosUbicacion padding">
        <FontAwesomeIcon icon={faLocationDot} className="iconoLugar" />
        <p>{dataAutoSolo.ciudad?.nombre}</p>
      </div>
      <div className="favCompartir padding">
        <button onClick={cambiar} className="cambiarIconosComp">
          {cambioIcono ? (
            <span
              className="material-symbols-outlined"
              style={{ color: "#191B1D" }}
            >
              close
            </span>
          ) : (
            <span
              className="material-symbols-outlined"
              style={{ color: "#191B1D" }}
            >
              share
            </span>
          )}
        </button>
        <ul
          className={`iconosComp ${cambioIcono ? "apararece" : "desaparece"}`}
        >
          <li className="iconoComp">
            <FontAwesomeIcon icon={faFacebook} />
          </li>
          <li className="iconoComp">
            <FontAwesomeIcon icon={faLinkedin} />
          </li>
          <li className="iconoComp">
            <FontAwesomeIcon icon={faTwitter} />
          </li>
          <li className="iconoComp">
            <FontAwesomeIcon icon={faInstagram} />
          </li>
        </ul>
      </div>
      <div className="bloqueImagenes" onClick={changeGaleria}>
        <div className="galeriaParaTabletPhone">
          {galeria ? <GaleriaTabletPhone listaImagenes={imagenes} /> : ""}
        </div>
        <div className="imagen1">
          {dataAutoSolo.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100% 100%"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={dataAutoSolo.imagenes?.[0]?.image}
              alt=""
            />
          )}
        </div>
        <div className="imagen2">
          {dataAutoSolo.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100% 100%"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={dataAutoSolo.imagenes?.[1]?.image}
              alt=""
            />
          )}
        </div>
        <div className="imagen2">
          {dataAutoSolo.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100% 100%"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={dataAutoSolo.imagenes?.[2]?.image}
              alt=""
            />
          )}
        </div>
        <div className="imagen2">
          {dataAutoSolo.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100% 100%"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={dataAutoSolo.imagenes?.[3]?.image}
              alt=""
            />
          )}
        </div>
        <div className="imagen2">
          {dataAutoSolo.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100% 100%"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={dataAutoSolo.imagenes?.[4]?.image}
              alt=""
            />
          )}
        </div>
        <button className="botonVerMasGaleria">Ver más</button>
      </div>
      <div className="bloqueDescripcion padding">
        <p className="tituloProducto">{dataAutoSolo.titulo} - ${dataAutoSolo.precio}</p>
        <p style={{ fontSize: "14px" }}>{dataAutoSolo.descripcion}</p>
      </div>
      <div className={`tituloSecciones padding `}>
        <p>¿Qué ofrece este auto?</p>
      </div>
      <div className={`caracteristicas padding `}>
        {dataAutoSolo.caracteristicas?.map((caracteristica) => {
          return (
            <div key={caracteristica?.idCaracteristica} style={{display: "flex"}}>
              <span className="material-symbols-outlined" style={{marginRight: "5px"}}>{caracteristica?.icono}</span>
              <p>{caracteristica?.nombre}</p>
            </div>
          );
        })}
      </div>
      <div className={`bloqueDescripcionSinBor padding `}>
        <p>Fechas disponibles</p>
      </div>
      <div className={`fechasDisponibles `}>
        <form className="formularioProducto" onSubmit={handleSubmit}>
          <div className="calendarioProductoDesktopTablet">
            <CalendarProducto
              funcion={setDataReserva}
              variable={dataReserva}
              rangoReservas={reservas}
            />
          </div>
          <div className="calendarioProductoPhone">
            <CalendarPhoneProducto
              funcion={setDataReserva}
              variable={dataReserva}
              rangoReservas={reservas}
            />
          </div>
          <div className="calendarioProductoDesktop">
            <CalendarDesktopProducto
              funcion={setDataReserva}
              variable={dataReserva}
              rangoReservas={reservas}
            />
          </div>
          <div className="cajaBotonProducto">
            <p>
              Agregá tus fechas de uso del vehículo para obtener precios exactos
            </p>
            {login !== null && login[0].currentTarget !== null ? (
              <Link
                to={`/producto/${id}/reserva`}
                className="botonIniciarReservaProducto"
              >
                <button type="submit">Iniciar reserva</button>
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ width: "100%" }}
                onClick={changeMensaje}
              >
                <button type="submit">Iniciar reserva</button>
              </Link>
            )}
          </div>
        </form>
      </div>
      {/* <div className={`tituloSeccionesBuscar padding `}>
        <p>¿Dónde lo vas a buscar?</p>
      </div>
      <div className={`mapa padding `}>
        <p>{dataAutoSolo.ciudad?.nombre}</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108977.23050043112!2d-64.26438357040529!3d-31.399287636279286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2zQ8OzcmRvYmE!5e0!3m2!1ses-419!2sar!4v1677607808146!5m2!1ses-419!2sar"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mapaUbicacion"
          title="iframe"
        ></iframe>
      </div> */}
      <div className={`tituloSecciones padding `}>
        <p>Qué tenés que saber</p>
      </div>
      <Politicas />
    </div>
  );
};

export default Producto;