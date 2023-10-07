import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BloqueHeader from "../Components/BloqueHeader";
import Politicas from "../Components/Politicas";
import "./ReservaStyles.css";
import {
  validarTexto,
  validarEmail,
  validarTextos,
} from "../Components/Utils/validaciones";
import Vector from "../img/Vector.png";
import Select from "react-select";
import ContentLoader from "react-content-loader";
import CalendarProducto from "../Components/CalendarProducto";
import CalendarPhoneProducto from "../Components/CalendarPhoneProducto";
import CalendarDesktopProducto from "../Components/CalendarDesktopProducto";
import { ContextGlobal } from "../Components/Utils/global.context";
import { DateObject } from "react-multi-date-picker";
import Swal from "sweetalert2";

const Reserva = () => {
  const [mensajeCargando, setMensajeCargando] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { id } = useParams();
  const { usuario, login } = useContext(ContextGlobal);
  const [dataAutoSolo, setDataAutoSolo] = useState([]);
  const navigate = useNavigate(); //usar para llevarlo a la pagina de reserva con exito
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
  function ordenarImagenesPorTitulo(data) {
    const newData = { ...data }; // Copiamos el objeto para no modificar el original
    newData.imagenes.sort((a, b) => {
        const lastDigitA = parseInt(a.titulo.slice(-1));
        const lastDigitB = parseInt(b.titulo.slice(-1));
        return lastDigitA - lastDigitB;
    });

    return newData;
}
  const options = [
    { value: "01:00:00", label: "01:00 AM" },
    { value: "02:00:00", label: "02:00 AM" },
    { value: "03:00:00", label: "03:00 AM" },
    { value: "04:00:00", label: "04:00 AM" },
    { value: "05:00:00", label: "05:00 AM" },
    { value: "06:00:00", label: "06:00 AM" },
    { value: "07:00:00", label: "07:00 AM" },
    { value: "08:00:00", label: "08:00 AM" },
    { value: "09:00:00", label: "09:00 AM" },
    { value: "10:00:00", label: "10:00 AM" },
    { value: "11:00:00", label: "11:00 AM" },
    { value: "12:00:00", label: "12:00 AM" },
    { value: "13:00:00", label: "01:00 PM" },
    { value: "14:00:00", label: "02:00 PM" },
    { value: "15:00:00", label: "03:00 PM" },
    { value: "16:00:00", label: "04:00 PM" },
    { value: "17:00:00", label: "05:00 PM" },
    { value: "18:00:00", label: "06:00 PM" },
    { value: "19:00:00", label: "07:00 PM" },
    { value: "20:00:00", label: "08:00 PM" },
    { value: "21:00:00", label: "09:00 PM" },
    { value: "22:00:00", label: "10:00 PM" },
    { value: "23:00:00", label: "11:00 PM" },
    { value: "24:00:00", label: "12:00 PM" },
  ];
  const [dataReserva, setDataReserva] = useState({
    name: "",
    surname: "",
    email: "",
    ciudad: "",
    checkInProducto: "",
    checkOutProducto: "",
    horarioLlegada: "",
  });
  const [userId, setUserId] = useState();
  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/clientes")
        .then((res) => res.json())
        .then((data) =>
          data.map((cliente) => {
            if (cliente.email === usuario.email) {
              setUserId(cliente.idUsuario);
            }
          })
        );
    } catch (error) {
      console.error(error);
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    let fechaEntrada = dataReserva.checkInProducto
      .split("/")
      .reverse()
      .join("-");
    let fechaSalida = dataReserva.checkOutProducto
      .split("/")
      .reverse()
      .join("-");
    if (
      validarTexto(e.target[0].value) &&
      validarTexto(e.target[1].value) &&
      validarEmail(e.target[2].value) &&
      // validarTextos(e.target[3].value) &&
      dataReserva.checkInProducto !== undefined &&
      dataReserva.checkOutProducto !== undefined &&
      dataReserva.horarioLlegada !== ""
    ) {
      setMensajeCargando(true);
      const body = document.getElementsByTagName("body");
      body[0].style.overflow = "hidden";
      var data = {
        horaComienzoReserva: dataReserva.horarioLlegada,
        fechaInicialReserva: fechaEntrada,
        fechaFinalReserva: fechaSalida,
        cliente: userId,
        producto: id,
      };
      try {
        fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/reservas`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json", Authorization: login },
        })
          .then((res) => {
            res.json();
            if (res.status === 200) {
              navigate("/administracion/productoCreado");
              body[0].style.overflow = "";
            } else {
              Swal.fire({
                icon: "error",
                title: "Uy...",
                text: "No se pudo agregar la reserva!",
              });
              setMensajeCargando(false);
              body[0].style.overflow = "";
            }
          })
          .then(() => {
            e.target.children[2].children[1].children[1].children[3].classList.remove(
              "visibleReserva"
            );
            e.target.children[2].children[1].children[1].children[3].classList.add(
              "invisibleReserva"
            );
            setMensajeCargando(false);
            body[0].style.overflow = "";
            navigate(`/producto/${id}/reserva/reservaExitosa`);
          });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // console.log(e.target[0].value);
      // console.log(validarTexto(e.target[0].value));
      // console.log(e.target[1].value);
      // console.log(validarTexto(e.target[1].value));
      // console.log(e.target[2].value);
      // console.log(validarEmail(e.target[2].value));
      // console.log(e.target[3].value);
      // console.log(validarTextos(e.target[3].value));
      e.target.children[2].children[1].children[1].children[3].classList.add(
        "visibleReserva"
      );
      e.target.children[2].children[1].children[1].children[3].classList.remove(
        "invisibleReserva"
      );
    }
  }
  return (
    <div className="reservaDelProducto">
      <div className={mensajeCargando ? `cajaCargadorProducto` : `invisible`}>
        <div className="typewriterCargador">
          <p style={{ fontSize: "28px", fontWeight: "700" }}>
            Agregando la reserva
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
      <BloqueHeader
        categoria={dataAutoSolo.categoria?.titulo}
        nombre={dataAutoSolo.titulo}
      />
      <form className="cajaReservando" onSubmit={handleSubmit}>
        <div className="invisibleReserva"></div>
        <div className="cajaFormularioReserva">
          <div>
            <p className="tituloReserva">Tus datos</p>
            <div className="bloqueInputsReserva">
              <div className="nombreReserva">
                <label>Nombre</label>
                <input
                  type="text"
                  id="inputNombreReserva"
                  className="reserva"
                  disabled
                  placeholder={usuario?.nombre}
                  value={usuario?.nombre}
                  onChange={(e) =>
                    setDataReserva({
                      ...dataReserva,
                      name: e.target.value,
                    })
                  }
                />
                <p className="invisible">Este campo es obligatorio</p>
              </div>
              <div className="apellidoReserva">
                <label>Apellido</label>
                <input
                  type="text"
                  id="inputApellidoReserva"
                  className="reserva"
                  disabled
                  placeholder={usuario?.apellido}
                  value={usuario?.apellido}
                  onChange={(e) =>
                    setDataReserva({
                      ...dataReserva,
                      surname: e.target.value,
                    })
                  }
                />
                <p className="invisible">Este campo es obligatorio</p>
              </div>
              <div className="emailReserva">
                <label>Correo electronico</label>
                <input
                  type="email"
                  id="inputEmailReserva"
                  placeholder={usuario?.email}
                  value={usuario?.email}
                  disabled
                  className="reserva"
                  onChange={(e) =>
                    setDataReserva({
                      ...dataReserva,
                      email: e.target.value,
                    })
                  }
                />
                <p className="invisible">Este campo es obligatorio</p>
              </div>
              {/* <div className="ciudadReserva">
                <label>Ciudad</label>
                <input
                  type="text"
                  id="inputCiudadReserva"
                  className="reservaCiudad"
                  onChange={(e) =>
                    setDataReserva({
                      ...dataReserva,
                      ciudad: e.target.value,
                    })
                  }
                />
                <p className="invisible">Este campo es obligatorio</p>
              </div> */}
            </div>
          </div>
          <div>
            <p className="tituloReserva">Seleccioná tu fecha de reserva</p>
            <div style={{ marginBottom: "35px" }}>
              <div className="calendarioReservaDesktopTablet">
                <CalendarProducto
                  funcion={setDataReserva}
                  variable={dataReserva}
                  rangoReservas={reservas}
                />
              </div>
              <div className="calendarioReservaPhone">
                <CalendarPhoneProducto
                  funcion={setDataReserva}
                  variable={dataReserva}
                  rangoReservas={reservas}
                />
              </div>
              <div className="calendarioReservaDesktop">
                <CalendarDesktopProducto
                  funcion={setDataReserva}
                  variable={dataReserva}
                  rangoReservas={reservas}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="tituloReserva">Tu horario de llegada</p>
            <div className="horarioLlegada">
              <p className="horarioLlegadaTexto">
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "7px" }}
                >
                  check_circle
                </span>
                Nuestro servicio de alquiler de autos es 24/7.
              </p>
              <p>Indicá tu horario estimado de llegada </p>
              <Select
                defaultValue={dataReserva.horarioLlegada}
                onChange={(e) => {
                  setDataReserva({
                    ...dataReserva,
                    horarioLlegada: e.value,
                  });
                }}
                options={options}
                className="horario"
                placeholder="Seleccionar hora de llegada"
                menuPosition="fixed"
                menuPlacement="top"
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
        </div>
        <div className="cardReserva">
          <p className="cardReservaTitulo">Detalle de la reserva</p>
          <div className="datosCajaReservas">
            <div className="imagenPrincipalReserva">
              {dataAutoSolo.length === 0 ? (
                <div>
                  <ContentLoader
                    className="skeletonScreenReservaDesktop"
                    speed={1}
                    width={400}
                    height={300}
                    viewBox="0 0 100% 300"
                    backgroundColor="#a2a0a0"
                    foregroundColor="#ecebeb"
                    style={{ marginBottom: "30px" }}
                  >
                    <rect width="100%" height="300" />
                  </ContentLoader>
                  <ContentLoader
                    className="skeletonScreenReservaTablet"
                    speed={1}
                    width={400}
                    height={374}
                    viewBox="0 0 100% 374"
                    backgroundColor="#a2a0a0"
                    foregroundColor="#ecebeb"
                  >
                    <rect width="100%" height="374" />
                  </ContentLoader>
                  <ContentLoader
                    className="skeletonScreenReservaTablet2"
                    speed={1}
                    width={400}
                    height={312}
                    viewBox="0 0 100% 312"
                    backgroundColor="#a2a0a0"
                    foregroundColor="#ecebeb"
                  >
                    <rect width="100%" height="312" />
                  </ContentLoader>
                </div>
              ) : (
                <img
                  src={dataAutoSolo.imagenes?.[0].image}
                  alt={dataAutoSolo.imagenes?.[0].titulo}
                  className="cardReservaImagen"
                />
              )}
            </div>
            <div className="datosReserva">
              <div className="catNom cajaReserva">
                <p>{dataAutoSolo.categoria?.titulo}</p>
                <h2>{dataAutoSolo.titulo}</h2>
              </div>
              <div className="icoUbi cajaReserva2">
                <img src={Vector} alt="iconoVector" />
                <p>{dataAutoSolo.ciudad?.nombre}</p>
              </div>
              <div className="cajaReserva2">
                <div className="cajasReservasCheck">
                  <p style={{ fontWeight: "700" }}>Check in</p>
                  {dataReserva.checkInProducto === undefined ? (
                    <p className="cargarReservas">
                      <span>____</span>/<span>____</span>/<span>____</span>
                    </p>
                  ) : (
                    <p className="cargarReservas">
                      {dataReserva.checkInProducto}
                    </p>
                  )}
                </div>
                <div className="cajasReservasCheck">
                  <p style={{ fontWeight: "700" }}>Check out</p>
                  {dataReserva.checkOutProducto === undefined ? (
                    <p className="cargarReservas">
                      <span>____</span>/<span>____</span>/<span>____</span>
                    </p>
                  ) : (
                    <p className="cargarReservas">
                      {dataReserva.checkOutProducto}
                    </p>
                  )}
                </div>
              </div>
              <p className="invisibleReserva">Revisa los campos!</p>
              <button type="submit" className="confirmarReserva">
                Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      </form>
      <Politicas />
    </div>
  );
};

export default Reserva;