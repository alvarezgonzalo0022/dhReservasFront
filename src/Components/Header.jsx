import { useContext } from "react";
import "./HeaderStyles.css";
import Logo from "../img/logo1.png";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { ContextGlobal } from "./Utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const Header = () => {
  const {
    menuPhone,
    setInMenuPhone,
    setOutMenuPhone,
    login,
    setLogout,
    galeriaImagenes,
    setInGaleriaImagenes,
    setOutMensajeLogin,
    usuario,
    setOutUsuario,
  } = useContext(ContextGlobal);
  const changeMensaje = () => {
    setOutMensajeLogin();
  };
  const location = useLocation();
  const menu = menuPhone === false;
  const galeria = galeriaImagenes === false;
  const navigate = useNavigate();
  const { id } = useParams();
  const change = () => {
    setOutMensajeLogin();
    if (menu) setOutMenuPhone();
    else setInMenuPhone();
  };
  let decoded;
  if (login !== null && login !== undefined) {
    // console.log(login)
    decoded = jwt_decode(login);
    // console.log(decoded)
  }

  const inicialNom = usuario?.nombre?.split("")?.[0];
  const inicialApe = usuario?.apellido?.split("")?.[0];
  const changeGaleria = () => {
    setOutMensajeLogin();
    if (!galeria) {
      setInGaleriaImagenes();
      body[0].style.overflow = "";
    }
  };
  const body = document.getElementsByTagName("body");
  const [userId, setUserId] = useState();
  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/clientes")
        .then((res) => res.json())
        .then((data) =>
          data.map((cliente) => {
            if (cliente?.email === usuario?.email) {
              setUserId(cliente.idUsuario);
            }
          })
        );
    } catch (error) {
      console.error(error);
    }
  }, []);
  const buttonsForDesktop = () => {
    if (
      location.pathname === "/home" ||
      location.pathname === `/producto/${id}` ||
      location.pathname === `/producto/${id}/reserva` ||
      location.pathname === `/producto/${id}/reserva/reservaExitosa` ||
      location.pathname === `/administracion` ||
      location.pathname === `/administracion/productoCreado` ||
      location.pathname === `/administracion/productoEliminado` ||
      location.pathname === `/administracion/productoActualizado` ||
      location.pathname === `/${userId}/reservas` ||
      location.pathname === `/${userId}/reservas/eliminacionReservaExitosa`
    ) {
      return login !== null &&
        login?.[0]?.currentTarget !== null &&
        login?.[0] !== undefined ? (
        <div className="usuario">
          {decoded?.authorities?.includes("Admin") ? (
            <div className="entrarAdministracion">
              <Link to={`/administracion`}>
                <p style={{ fontWeight: "700" }}>Administracion</p>
              </Link>
            </div>
          ) : (
            <div className="entrarAReservas">
              <Link to={`/${userId}/reservas`}>
                <p style={{ fontWeight: "700" }}>Mis Reservas</p>
              </Link>
            </div>
          )}

          <div className="siglas">
            <p>
              {inicialNom}
              {inicialApe}
            </p>
          </div>
          <div className="saludo">
            <p className="hola">Hola,</p>
            <p className="saludoNombre">
              {usuario?.nombre} {usuario?.apellido}
            </p>
          </div>
          <button
            onClick={() => {
              setLogout();
              setOutUsuario();
              navigate(`/home`);
            }}
            className="iconoCerrar"
          >
            <span className="material-symbols-outlined cerrar"> close </span>
          </button>
        </div>
      ) : (
        <div className={`DosBtn ${menu ? "" : "isActive"}`}>
          <Link to="/createAccount">
            <button className="boton" onClick={changeGaleria}>
              Crear cuenta
            </button>
          </Link>
          {menu ? "" : <hr color="#31363F" />}
          <Link to="/login">
            <button className="boton" onClick={changeGaleria}>
              Iniciar sesion
            </button>
          </Link>
        </div>
      );
    } else if (location.pathname === "/login") {
      return (
        <div className={`UnBtn ${menu ? "" : "isActive"}`}>
          <Link to="/createAccount" onClick={changeMensaje}>
            <button className="boton">Crear cuenta</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={`UnBtn ${menu ? "" : "isActive"}`}>
          <Link to="/login">
            <button className="boton">Iniciar sesion</button>
          </Link>
        </div>
      );
    }
  };

  const buttonsForPhone = () => {
    if (
      location.pathname === "/home" ||
      location.pathname === `/producto/${id}` ||
      location.pathname === `/producto/${id}/reserva` ||
      location.pathname === `/producto/${id}/reserva/reservaExitosa` ||
      location.pathname === `/administracion` ||
      location.pathname === `/administracion/productoCreado` ||
      location.pathname === `/administracion/productoEliminado` ||
      location.pathname === `/administracion/productoActualizado` ||
      location.pathname === `/${userId}/reservas` ||
      location.pathname === `/${userId}/reservas/eliminacionReservaExitosa`
    ) {
      return login !== null &&
        login?.[0]?.currentTarget !== null &&
        login?.[0] !== undefined ? (
        <div className="usuario">
          <div className="siglas">
            <p>
              {inicialNom}
              {inicialApe}
            </p>
          </div>
          <div className="saludo">
            <p className="hola">Hola,</p>
            <p className="saludoNombre">
              {usuario?.nombre} {usuario?.apellido}
            </p>
          </div>
          <button
            onClick={() => {
              setLogout();
              setOutUsuario();
              navigate(`/home`);
            }}
            className={`iconoCerrar ${menu ? "" : "desaparecer"}`}
          >
            <span className="material-symbols-outlined cerrar"> close </span>
          </button>
        </div>
      ) : (
        <div className={`DosBtn ${menu ? "" : "isActive"}`}>
          <Link to="/createAccount">
            <button className="boton" onClick={change}>
              Crear cuenta
            </button>
          </Link>
          {menu ? "" : <hr color="#31363F" />}
          <Link to="/login">
            <button className="boton" onClick={change}>
              Iniciar sesion
            </button>
          </Link>
        </div>
      );
    } else if (location.pathname === "/login") {
      return (
        <div className={`UnBtn ${menu ? "" : "isActive"}`}>
          <Link to="/createAccount">
            <button className="boton" onClick={change}>
              Crear cuenta
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={`UnBtn ${menu ? "" : "isActive"}`}>
          <Link to="/login">
            <button className="boton" onClick={change}>
              Iniciar sesion
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <header className={`header ${menu ? "" : "isActive"}`}>
      <div className={`${menu ? "" : "desaparecer"}`}>
        <Link className="Logo" to="/home" onClick={changeGaleria}>
          <img src={Logo} alt="logo" />
          <p>Alquiler de autos</p>
        </Link>
      </div>
      <div className={`${menu ? "" : "caja1"}`}>
        <button onClick={change} className="menu">
          {menu ? (
            <span className="material-symbols-outlined abrir"> menu </span>
          ) : (
            <span className="material-symbols-outlined cerrar"> close </span>
          )}
        </button>
        <div className={`cajaUsuarioMenu ${menu ? "desaparecer" : ""}`}>
          {login !== null &&
          login?.[0]?.currentTarget !== null &&
          login?.[0] !== undefined ? (
            buttonsForPhone()
          ) : (
            <p className={`menuTitulo ${menu ? "desaparecer" : ""}`}>MENÚ</p>
          )}
        </div>
      </div>
      <div className="borrar">{buttonsForDesktop()}</div>
      <div className={`${menu ? "desaparecer" : "caja2"}`}>
        {login !== null &&
        login?.[0]?.currentTarget !== null &&
        login?.[0] !== undefined
          ? ""
          : buttonsForPhone()}
        {login !== null &&
        login?.[0]?.currentTarget !== null &&
        login?.[0] !== undefined ? (
          <div className="mensajeCerrar">
            {decoded?.authorities?.includes("Admin") ? (
                <Link to={`/administracion`} onClick={change}>
                  <p style={{ fontWeight: "700" }}>Administracion</p>
                </Link>
            ) : (
                <Link to={`/${userId}/reservas`} onClick={change}>
                  <p style={{ fontWeight: "700" }}>Mis Reservas</p>
                </Link>
            )}
            <div style={{ width: "100%" }}>
              <p className="redireccion" style={{ textAlign: "end" }}>
                ¿Deseas{" "}
                <span
                  onClick={() => {
                    setLogout();
                    setOutUsuario();
                    navigate(`/home`);
                  }}
                >
                  cerrar sesión
                </span>
                ?
              </p>
              <hr color="#31363F" />
            </div>
          </div>
        ) : (
          ""
        )}
        <ul className={`${menu ? "desaparecer" : "iconosMenu"}`}>
          <li className="iconoMenu">
            <FontAwesomeIcon icon={faFacebook} />
          </li>
          <li className="iconoMenu">
            <FontAwesomeIcon icon={faLinkedin} />
          </li>
          <li className="iconoMenu">
            <FontAwesomeIcon icon={faTwitter} />
          </li>
          <li className="iconoMenu">
            <FontAwesomeIcon icon={faInstagram} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
