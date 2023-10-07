import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import {
  validarEmail,
  validarContrasenia,
} from "../Components/Utils/validaciones";
import { ContextGlobal } from "../Components/Utils/global.context";

const Login = () => {
  const navigate = useNavigate();
  const [cambio, setCambio] = useState(false);
  const { setInListAutosUbi, setOutMensajeLogin, mensajeLogin, setInUsuario } =
    useContext(ContextGlobal);
  const changeMensaje = () => {
    setOutMensajeLogin();
  };
  useEffect(() => {
    setInListAutosUbi([]);
  }, []);
  const { login, setLogout, setLogin } = useContext(ContextGlobal);
  const sesion = login === false;
  const logout = () => {
    if (sesion) setLogin();
    else setLogout();
  };
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  function mostrar(e) {
    e.preventDefault();
    setCambio(!cambio);
    const tipo = document.getElementById("inputPasswordIniciar");
    if (tipo.type === "password") {
      return (tipo.type = "text");
    } else {
      tipo.type = "password";
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    // console.log(e.target[0].value);
    // console.log(e.target.children[0].children[2]);
    // console.log(e.target.children[0].children[5]);
    // console.log(validarEmail(e.target[0].value));
    // console.log(e.target[1].value);
    // console.log(validarContrasenia(e.target[1].value));
    if (
      validarEmail(e.target[0].value) &&
      validarContrasenia(e.target[1].value)
    ) {
      var data = {
        email: e.target[0].value,
        password: e.target[1].value,
      };
      try {
        fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          // console.log(res.status);
          if (res.status === 200) {
            let tokenJwt = res.headers.get("Authorization");
            // console.log(tokenJwt)
            setLogin(tokenJwt);
            try {
              fetch(
                `https://dhreservas-bd190ac8106b.herokuapp.com/clientes/buscarClienteEmail/${data.email}`
              )
                .then((res) => res.json())
                .then((data) => {
                  setInUsuario(data);
                  navigate("/home");
                });
            } catch (error) {
              console.log(error.message);
            }
          } else {
            e.target.children[1].classList.remove("invisible");
            e.target.children[1].classList.add("visible");
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      if (validarEmail(e.target[0].value)) {
        e.target[0].classList.remove("error");
        e.target.children[0].children[2].classList.remove("visible");
        e.target.children[0].children[2].classList.add("invisible");
      }
      if (validarContrasenia(e.target[1].value)) {
        e.target.children[0].children[4].classList.remove("error");
        e.target.children[0].children[5].classList.remove("visible");
        e.target.children[0].children[5].classList.add("invisible");
      }
      if (!validarEmail(e.target[0].value)) {
        e.target[0].classList.add("error");
        e.target.children[0].children[2].classList.remove("invisible");
        e.target.children[0].children[2].classList.add("visible");
      }
      if (!validarContrasenia(e.target[1].value)) {
        e.target.children[0].children[4].classList.add("error");
        e.target.children[0].children[5].classList.remove("invisible");
        e.target.children[0].children[5].classList.add("visible");
      }
      return alert("Fijate que lo rellenaste mal");
    }
  }

  return (
    <div className="formInicio">
      {mensajeLogin ? (
        <div className="mensajeDeReserva">
          <span className="material-symbols-rounded errorIcono">error</span>
          <p>Para realizar una reserva necesitas estar logueado</p>
        </div>
      ) : (
        ""
      )}
      <h1 className="tituloInicio">Iniciar sesion</h1>
      <form className="formularioInicio" onSubmit={handleSubmit}>
        <div className="cajaFormulario">
          <label>Email</label>
          <input
            type="email"
            id="inputEmailIniciar"
            className="inicio"
            onChange={(e) =>
              setDataLogin({ ...dataLogin, email: e.target.value })
            }
          />
          <p className="invisible">Este campo es obligatorio</p>
          <label>Contraseña</label>
          <div className="cajaContra">
            <input
              type="password"
              id="inputPasswordIniciar"
              className="inputContra"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, password: e.target.value })
              }
            />
            <button onClick={mostrar} className="mostrarContra">
              {cambio ? (
                <span className="material-symbols-outlined fino">
                  visibility
                </span>
              ) : (
                <span
                  className="material-symbols-outlined fino"
                  style={{ transform: "scaleX(-1)" }}
                >
                  visibility_off
                </span>
              )}
            </button>
          </div>
          <p className="invisible">Este campo es obligatorio</p>
        </div>
        <p className="invisible">
          No existe esta cuenta, revise los campos o crea una cuenta
        </p>
        <button type="submit" className="botonIniciar" onClick={changeMensaje}>
          Iniciar sesion
        </button>
        <p className="redireccion">
          ¿Aún no tenes cuenta?{" "}
          <Link
            to="/createAccount"
            className="linkCreate"
            onClick={changeMensaje}
          >
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
