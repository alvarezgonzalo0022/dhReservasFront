import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccountStyles.css";
import {
  validarTexto,
  validarEmail,
  validarContrasenia,
  compararContrasenias,
} from "../Components/Utils/validaciones";
import { ContextGlobal } from "../Components/Utils/global.context";
import jwt_decode from 'jwt-decode';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { setInListAutosUbi, setInUsuario } = useContext(ContextGlobal);
  useEffect(() => {
    setInListAutosUbi([]);
  }, []);
  const [cambio, setCambio] = useState(false);
  const { setLogin } = useContext(ContextGlobal);
  const [dataCreateAccount, setDataCreateAccount] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repitPassword: "",
  });
  function mostrar(e) {
    e.preventDefault();
    setCambio(!cambio);
    const tipo = document.getElementById("inputPasswordCreate");
    if (tipo.type === "password") {
      return (tipo.type = "text");
    } else {
      tipo.type = "password";
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target.children[0].children[0].children[0].children[2]);
    // console.log(e.target.children[0].children[0].children[1].children[2]);
    // console.log(e.target.children[0].children[3]);
    // console.log(e.target.children[0].children[6]);
    // console.log(e.target.children[0].children[9]);
    // console.log(e.target[0].value);
    // console.log(validarTexto(e.target[0].value));
    // console.log(e.target[1].value);
    // console.log(validarTexto(e.target[1].value));
    // console.log(e.target[2].value);
    // console.log(validarEmail(e.target[2].value));
    // console.log(e.target[3].value);
    // console.log(validarContrasenia(e.target[3].value));
    // console.log(e.target[5].value);
    // console.log(compararContrasenias(e.target[3].value, e.target[5].value));
    if (
      validarTexto(e.target[0].value) &&
      validarTexto(e.target[1].value) &&
      validarEmail(e.target[2].value) &&
      validarContrasenia(e.target[3].value) &&
      compararContrasenias(e.target[3].value, e.target[5].value)
    ) {
      var data = {
        nombre: e.target[0].value,
        apellido: e.target[1].value,
        email: e.target[2].value,
        contraseña: e.target[3].value,
      };
      let dataLogin = {
        email: e.target[2].value,
        password: e.target[3].value,
      };
      try {
        fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/clientes`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.status === 201) {
            setInUsuario(data)
            try {
              fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/login`, {
                method: "POST",
                body: JSON.stringify(dataLogin),
                headers: { "Content-Type": "application/json" },
              }).then((res) => {
                let tokenJwt = res.headers.get("Authorization")
                // console.log(tokenJwt);
                setLogin(tokenJwt);
              });
            } catch (error) {
              console.log(error.message);
            }
            navigate("/home")
          } else {

          }
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      if (validarEmail(e.target[2].value)) {
        e.target[2].classList.remove("error");
        e.target.children[0].children[3].classList.remove("visible");
        e.target.children[0].children[3].classList.add("invisible");
      }
      if (validarContrasenia(e.target[3].value)) {
        e.target.children[0].children[5].classList.remove("error");
        e.target.children[0].children[6].classList.remove("visible");
        e.target.children[0].children[6].classList.add("invisible");
      }
      if (validarTexto(e.target[0].value)) {
        e.target[0].classList.remove("error");
        e.target.children[0].children[0].children[0].children[2].classList.remove(
          "visible"
        );
        e.target.children[0].children[0].children[0].children[2].classList.add(
          "invisible"
        );
      }
      if (compararContrasenias(e.target[3].value, e.target[5].value)) {
        // console.log(e.target[3].value);
        // console.log(e.target[5].value);
        e.target[5].classList.remove("error");
        e.target.children[0].children[9].classList.remove("visible");
        e.target.children[0].children[9].classList.add("invisible");
      }
      if (validarTexto(e.target[1].value)) {
        e.target[1].classList.remove("error");
        e.target.children[0].children[0].children[1].children[2].classList.remove(
          "visible"
        );
        e.target.children[0].children[0].children[1].children[2].classList.add(
          "invisible"
        );
      }
      if (!validarEmail(e.target[2].value)) {
        e.target[2].classList.add("error");
        e.target.children[0].children[3].classList.remove("invisible");
        e.target.children[0].children[3].classList.add("visible");
      }
      if (!validarContrasenia(e.target[3].value)) {
        e.target.children[0].children[5].classList.add("error");
        e.target.children[0].children[6].classList.remove("invisible");
        e.target.children[0].children[6].classList.add("visible");
      }
      if (!validarTexto(e.target[0].value)) {
        e.target[0].classList.add("error");
        e.target.children[0].children[0].children[0].children[2].classList.remove(
          "invisible"
        );
        e.target.children[0].children[0].children[0].children[2].classList.add(
          "visible"
        );
      }
      if (!compararContrasenias(e.target[3].value, e.target[5].value)) {
        e.target[5].classList.add("error");
        e.target.children[0].children[9].classList.remove("invisible");
        e.target.children[0].children[9].classList.add("visible");
      }
      if (!validarTexto(e.target[1].value)) {
        e.target[1].classList.add("error");
        e.target.children[0].children[0].children[1].children[2].classList.remove(
          "invisible"
        );
        e.target.children[0].children[0].children[1].children[2].classList.add(
          "visible"
        );
      }
    }
  }

  return (
    <div className="formCreate">
      <h1 className="tituloCreate">Crear cuenta</h1>
      <form className="formularioCreate" onSubmit={handleSubmit}>
        <div className="cajaFormularioCreate">
          <div className="cajaNomApe">
            <div className="nomApe">
              <label>Nombre</label>
              <input
                type="text"
                id="inputNombreCreate"
                className="create"
                onChange={(e) =>
                  setDataCreateAccount({
                    ...dataCreateAccount,
                    name: e.target.value,
                  })
                }
              />
              <p className="invisible">Este campo es obligatorio</p>
            </div>
            <div className="nomApe">
              <label>Apellido</label>
              <input
                type="text"
                id="inputApellidoCreate"
                className="create"
                onChange={(e) =>
                  setDataCreateAccount({
                    ...dataCreateAccount,
                    surname: e.target.value,
                  })
                }
              />
              <p className="invisible">Este campo es obligatorio</p>
            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            id="inputEmailCreate"
            className="create"
            onChange={(e) =>
              setDataCreateAccount({
                ...dataCreateAccount,
                email: e.target.value,
              })
            }
          />
          <p className="invisible">Este campo es obligatorio</p>
          <label>Contraseña</label>
          <div className="cajaContra">
            <input
              type="password"
              id="inputPasswordCreate"
              className="inputContra"
              onChange={(e) =>
                setDataCreateAccount({
                  ...dataCreateAccount,
                  password: e.target.value,
                })
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
          <p className="invisible">La contraseña minimo tiene que tener 6 caracteres</p>
          <label>Repetir contraseña</label>
          <input
            type="password"
            id="inputPasswordRepetidaCreate"
            className="create"
            onChange={(e) =>
              setDataCreateAccount({
                ...dataCreateAccount,
                repitPassword: e.target.value,
              })
            }
          />
          <p className="invisible">Este campo es obligatorio</p>
        </div>
        <p className="invisible">
          No existe esta cuenta, revise los campos o crea una cuenta
        </p>
        <button type="submit" className="botonCrear">
          Crear cuenta
        </button>
        <p className="redireccion">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="linkInicio">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
