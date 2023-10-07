import React, { useEffect, useState } from "react";
import Select from "react-select";
import { components } from "react-select";
import Atributos from "./Atributos";
import Imagenes from "./Imagenes";
import { useNavigate } from "react-router-dom";
import "./ProductoAModificarStyles.css";
import Swal from 'sweetalert2'

const ProductoAModificar = ({ idProductoModificarNum }) => {
  // const [productoAModificar, setProductoAModificar] = useState([]);
  const [dataAgregarProducto, setDataAgregarProducto] = useState({
    idProducto: idProductoModificarNum,
    valoracionDeSeguridad: 1,
    precio: null,
    titulo: "",
    descripcion: "",
    categoria: null,
    ciudad: null,
    caracteristicas: [],
    imagenes: [],
    politicas: [],
  });
  const [compAtributos, setCompAtributos] = useState([]);
  const [compImagenes, setCompImagenes] = useState([]);
  const [categoryListId, setCategoryListId] = useState([]);
  const [ciudadListId, setCiudadListId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/${idProductoModificarNum}`)
        .then((res) => res.json())
        .then((data) => {
          // setProductoAModificar(data);
          data?.caracteristicas?.map((caracteristica) => {
            compAtributos.push(caracteristica);
            dataAgregarProducto.caracteristicas.push({
              nombre: caracteristica.nombre,
              icono: caracteristica.icono,
            });
          });
          data?.imagenes?.map((imagen) => {
            compImagenes.push(imagen);
            dataAgregarProducto.imagenes.push({
              titulo: imagen.titulo,
              image: imagen.image,
            });
          });
          setDataAgregarProducto({
            ...dataAgregarProducto,
            valoracionDeSeguridad: data.valoracionDeSeguridad,
            precio: data.precio,
            titulo: data.titulo,
            descripcion: data.descripcion,
            categoria: data?.categoria?.idCategoria,
            ciudad: data?.ciudad?.idCiudad,
          });
          setCategoryListId({
            value: data?.categoria?.idCategoria,
            label: data?.categoria?.titulo,
          });
          setCiudadListId({
            value: data?.ciudad?.idCiudad,
            label: data?.ciudad?.nombre,
          });
          //   console.log(compAtributos);
        });
    }
    fetchData();
  }, []);
  // console.log(dataAgregarProducto);
  // console.log(compImagenes);
  const navigate = useNavigate();
  const { Option } = components;
  const TextOptionCiu = (props) => (
    <Option {...props}>
      <div>
        <p style={{ fontWeight: 700 }}>{props.data.label}</p>
        <p className="selectPais">{props.data.pais}</p>
      </div>
    </Option>
  );
  const TextOptionCate = (props) => (
    <Option {...props}>
      <div>
        <p style={{ fontWeight: 700 }}>{props.data.label}</p>
      </div>
    </Option>
  );
  const SingleValueCiudad = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {props.data.label}, {props.data.pais}
    </components.SingleValue>
  );
  const SingleValueCate = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {props.data.label}
    </components.SingleValue>
  );
  const [dataCiudades, setDataCiudades] = useState([]);

  // let prueba = {
  //   titulo: "",
  //   descripcion: "",
  //   categoria: null,
  //   ciudad: null,
  //   caracteristicas: [],
  //   imagenes: [
  //     { titulo: "", image: "" },
  //     { titulo: "", image: "" },
  //     { titulo: "", image: "" },
  //   ],
  //   politicas: [],
  // };
  const [count, setCount] = useState(0);
  const [countImagen, setCountImagen] = useState(0);
  const [compAtributos2, setCompAtributos2] = useState([]);
  const [compAtributo, setCompAtributo] = useState({
    nombre: "",
    icono: "",
  });

  const [compImagenes2, setCompImagenes2] = useState([]);
  const [compImagen, setCompImagen] = useState({
    titulo: "",
    image: "",
  });

  const [compPoliticas, setCompPoliticas] = useState({
    normas: "",
    seguridad: "",
    cancelacion: "",
  });

  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/ciudades")
        .then((res) => res.json())
        .then((data) =>
          setDataCiudades(
            data.map((ciudad) => {
              return {
                value: ciudad.idCiudad,
                label: ciudad.nombre,
                pais: ciudad.pais,
              };
            })
          )
        );
    } catch (error) {
      console.error(error);
    }
  }, []);
  const [categoryList, setCategoryList] = useState([]);

  //   console.log(productoAModificar.caracteristicas);
  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/categorias")
        .then((res) => res.json())
        .then((data) =>
          setCategoryList(
            data.map((producto) => {
              return {
                value: producto.idCategoria,
                label: producto.titulo,
              };
            })
          )
        );
    } catch (error) {
      console.error(error);
    }
  }, []);
  // console.log(categoryList);
  function agregandoAtributo() {
    if (
      compAtributo.nombre !== "" &&
      compAtributo.icono !== "" &&
      compAtributos.length <= 7
    ) {
      setCount(count + 1);
      setCompAtributos([
        ...compAtributos,
        {
          nombre: compAtributo.nombre,
          icono: compAtributo.icono,
          idCaracteristica: count,
        },
      ]);
      setCompAtributos2([
        ...compAtributos2,
        {
          nombre: compAtributo.nombre,
          icono: compAtributo.icono,
        },
      ]);
      setDataAgregarProducto({
        ...dataAgregarProducto,
        caracteristicas: [
          ...dataAgregarProducto.caracteristicas,
          {
            nombre: compAtributo.nombre,
            icono: compAtributo.icono,
          },
        ],
      });
    }
  }
  function agregandoImagen() {
    if (compImagen.image !== "") {
      setCountImagen(countImagen + 1);
      setCompImagenes([
        ...compImagenes,
        {
          titulo: "",
          image: compImagen.image,
          id: countImagen,
        },
      ]);
      setCompImagenes2([
        ...compImagenes2,
        {
          titulo: "",
          image: compImagen.image,
        },
      ]);
      setDataAgregarProducto({
        ...dataAgregarProducto,
        imagenes: [
          ...dataAgregarProducto.imagenes,
          {
            titulo: "",
            image: compImagen.image,
          },
        ],
      });
    }
  }
  function eliminandoAtributo(id, nom) {
    const newAtributos = compAtributos.filter((atributo) => {
      return atributo.idCaracteristica !== id;
    });
    const newAtributos2 = dataAgregarProducto.caracteristicas.filter(
      (atributo) => {
        return atributo.nombre !== nom;
      }
    );
    setCompAtributos(newAtributos);
    setDataAgregarProducto({
      ...dataAgregarProducto,
      caracteristicas: newAtributos2,
    });
  }
  function eliminandoImagen(id, nom) {
    const newImagenes = compImagenes.filter((imagen) => {
      return imagen.id !== id;
    });
    const newAtributos2 = dataAgregarProducto.imagenes.filter((imagen) => {
      return imagen.titulo !== nom;
    });
    setDataAgregarProducto({
      ...dataAgregarProducto,
      imagenes: newAtributos2,
    });
    setCompImagenes(newImagenes);
  }
  // console.log(compAtributos);
  // console.log(dataAgregarProducto.imagenes);
  //   console.log(compAtributos);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    // console.log(dataAgregarProducto.caracteristicas);
    // console.log(dataAgregarProducto.imagenes);
    // console.log("entro");
    // console.log(dataAgregarProducto.titulo !== "");
    // console.log(dataAgregarProducto.descripcion !== "");
    // console.log(dataAgregarProducto.categoria !== null);
    // console.log(dataAgregarProducto.ciudad !== null);
    // console.log(dataAgregarProducto.caracteristicas !== []);
    // console.log(dataAgregarProducto.imagenes !== []);
    if (
      dataAgregarProducto.titulo !== "" &&
      dataAgregarProducto.precio !== null &&
      dataAgregarProducto.descripcion !== "" &&
      dataAgregarProducto.categoria !== null &&
      dataAgregarProducto.ciudad !== null &&
      dataAgregarProducto.caracteristicas !== [""] &&
      dataAgregarProducto.imagenes !== [""]
    ) {
      e.target.children[0].classList.remove("invisible");
      e.target.children[0].classList.add("cajaCargadorProducto");
      // e.target.children[1].classList.remove("invisible");
      // e.target.children[1].classList.add("visible");
      //Hacer get y post de atributos
      // console.log("entro2");
      // let dataObjeto2 = { ...dataAgregarProducto, caracteristicas: prueba2 };
      // console.log(dataObjeto2)
      // try {
      //   fetch("http://ec2-3-22-186-180.us-east-2.compute.amazonaws.com:8080/caracteristicas")
      //     .then((res) => res.json())
      //     .then((data) =>
      //       data.map((atributo) => {
      //         dataAgregarProducto.caracteristicas.map((caracteristica) => {
      //           if (atributo.nombre === caracteristica.nombre) {
      //             setDataAgregarProducto({
      //               ...dataAgregarProducto,
      //               caracteristicas: [
      //                 ...dataAgregarProducto.caracteristicas,
      //                 atributo,
      //               ],
      //             });
      //           }
      //         });
      //       })
      //     );
      // } catch (error) {
      //   console.error(error);
      // }
      let prueba1 = dataAgregarProducto.imagenes.map((imagenSola, index) => {
        return {
          titulo: `${dataAgregarProducto.titulo} img${index + 100}`,
          image: imagenSola.image,
        };
      });
      let dataObjeto = {
        ...dataAgregarProducto,
        imagenes: prueba1,
      };
      // console.log(dataAgregarProducto);
      // console.log(dataObjeto);
      try {
        fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/productos`, {
          method: "PUT",
          body: JSON.stringify(dataObjeto),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          res.json();
          if (res.status === 200) {
            navigate("/administracion/productoActualizado");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Uy...',
              text: 'No se pudo actualizar el producto!',
            })
            e.target.children[0].classList.remove("cajaCargadorProducto");
            e.target.children[0].classList.add("invisible");
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  const idCategoriaFiltro = dataAgregarProducto?.categoria?.idCategoria - 1;
  const idCiudadFiltro = dataAgregarProducto?.ciudad?.idCiudad - 1;
  //   console.log(categoryList?.[idCategoriaFiltro]);
  // console.log(dataAgregarProducto?.categoria);
  return (
    <form className="cajaFormularioAdmin" onSubmit={handleSubmit}>
      <div className="invisible">
        <div className="typewriterCargador">
          <p style={{ fontSize: "28px", fontWeight: "700" }}>
            Actualizando el producto
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
      <div className="camposPrincipalesCrear">
        <div className="nombreVehiculoCrear">
          <label className="achicarLetra">Nombre del vehiculo</label>
          <input
            type="text"
            id="nombreVehiculoCrear"
            className="inputsCrear achicarLetra"
            defaultValue={dataAgregarProducto.titulo}
            // placeholder={productoAModificar.titulo}
            onChange={(e) =>
              setDataAgregarProducto({
                ...dataAgregarProducto,
                titulo: e.target.value,
              })
            }
          />
        </div>
        <div className="categoriaVehiculoCrear">
          <label className="achicarLetra">Categoria</label>
          <Select
            options={categoryList}
            className="achicarLetra"
            // placeholder={productoAModificar?.categoria?.titulo}
            value={categoryListId}
            components={{
              IndicatorSeparator: () => null,
              Option: TextOptionCate,
              SingleValueCate,
            }}
            onChange={(e) => {
              setDataAgregarProducto({
                ...dataAgregarProducto,
                categoria: e.value,
              });
              setCategoryListId({
                value: e.value,
                label: e.label,
              });
            }}
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
                width: "100%",
                cursor: "pointer",
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }),
            }}
          />
        </div>
        <div className="precioVehiculoCrear">
          <label className="achicarLetra">Precio</label>
          <input
            className="inputsCrear achicarLetra"
            type="number"
            defaultValue={dataAgregarProducto.precio}
            id="precioVehiculoCrear"
            onChange={(e) =>
                setDataAgregarProducto({
                  ...dataAgregarProducto,
                  precio: e.target.value,
                })
              }
          />
        </div>
        <div className="ciudadVehiculoCrear">
          <label className="achicarLetra">Ciudad</label>
          <Select
            options={dataCiudades}
            value={ciudadListId}
            className="achicarLetra"
            onChange={(e) => {
              setDataAgregarProducto({
                ...dataAgregarProducto,
                ciudad: e.value,
              });
              setCiudadListId({
                value: e.value,
                label: e.label,
              });
            }}
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
                width: "100%",
                cursor: "pointer",
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
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
              Option: TextOptionCiu,
              SingleValueCiudad,
            }}
          />
        </div>
      </div>
      <div className="descripcionProductoCrear">
        <label className="achicarLetra">Descripción</label>
        <textarea
          name="descripcionCrear"
          id="descripcionCrear"
          className="descripcionCrear achicarLetra"
          maxLength="255"
          //   placeholder="Escribir aquí"
          defaultValue={dataAgregarProducto?.descripcion}
          onChange={(e) =>
            setDataAgregarProducto({
              ...dataAgregarProducto,
              descripcion: e.target.value,
            })
          }
        ></textarea>
      </div>
      <div className="atributosProductoCrear">
        <p className="agregarAtributos">Agregar atributos</p>
        <section className="formularioAtributos">
          <div className="cajasInputsAtributos">
            <div className="nombreAtributo">
              <label className="achicarLetra">Nombre</label>
              <input
                type="text"
                placeholder="Wifi"
                className="inputsCrear achicarLetra"
                onChange={(e) =>
                  setCompAtributo({
                    ...compAtributo,
                    nombre: e.target.value,
                  })
                }
              />
            </div>
            <div className="iconoAtributo">
              <label className="achicarLetra">Ícono</label>
              <input
                type="text"
                className="inputsCrear achicarLetra"
                placeholder={`arrow_back_ios_new`}
                onChange={(e) =>
                  setCompAtributo({
                    ...compAtributo,
                    icono: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button
            className="addAtributo"
            onClick={agregandoAtributo}
            type="button"
          >
            <span className="material-symbols-outlined add">add</span>
          </button>
        </section>
        {compAtributos?.length === 0
          ? ""
          : compAtributos?.map((atributo) => {
              return (
                <div
                  style={{ position: "relative" }}
                  key={atributo.idCaracteristica}
                >
                  <Atributos nombre={atributo.nombre} icono={atributo.icono} />
                  <button
                    className="eliminarAtributo"
                    onClick={() =>
                      eliminandoAtributo(
                        atributo.idCaracteristica,
                        atributo.nombre
                      )
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined add">close</span>
                  </button>
                </div>
              );
            })}
        {compAtributos?.length === 8 ? (
          <p>Llegaste al limite de atributos!</p>
        ) : (
          ""
        )}
      </div>
      {/* <div className="politicasProductoCrear">
        <p className="agregarPoliticas">Políticas del producto</p>
        <div className="cajaAgregarPoliticas">
          <div className="cajaDescripcion">
            <p style={{ fontWeight: "700" }}>Normas del auto</p>
            <label className="achicarLetra" style={{ fontWeight: "500" }}>
              Descripción
            </label>
            <textarea
              name="politicaCrearNormas"
              id="politicaCrearNormas"
              className="politicaCrear achicarLetra"
              maxLength="255"
              placeholder="Escribir aquí"
              onChange={(e) =>
                setCompPoliticas({
                  ...compPoliticas,
                  normas: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="cajaDescripcion">
            <p style={{ fontWeight: "700" }}>Salud y seguridad</p>
            <label className="achicarLetra" style={{ fontWeight: "500" }}>
              Descripción
            </label>
            <textarea
              name="politicaCrearSalud"
              id="politicaCrearSalud"
              className="politicaCrear achicarLetra"
              maxLength="255"
              placeholder="Escribir aquí"
              onChange={(e) =>
                setCompPoliticas({
                  ...compPoliticas,
                  seguridad: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="cajaDescripcion">
            <p style={{ fontWeight: "700" }}>Politica de cancelacion</p>
            <label className="achicarLetra" style={{ fontWeight: "500" }}>
              Descripción
            </label>
            <textarea
              name="politicaCrearPolitica"
              id="politicaCrearPolitica"
              className="politicaCrear achicarLetra"
              maxLength="255"
              placeholder="Escribir aquí"
              onChange={(e) =>
                setCompPoliticas({
                  ...compPoliticas,
                  cancelacion: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </div> */}
      <div className="imagenesProductoCrear">
        <p className="agregarImagenes">Agregar imagenes</p>
        <section className="formularioImagenes">
          <div className="urlImagen">
            <input
              type="text"
              placeholder="Insertar https://"
              className="inputsCrear achicarLetra"
              onChange={(e) =>
                setCompImagen({
                  ...compImagen,
                  titulo: "",
                  image: e.target.value,
                })
              }
            />
          </div>
          <button className="addImagen" onClick={agregandoImagen} type="button">
            <span className="material-symbols-outlined add">add</span>
          </button>
        </section>
        {compImagenes.length === 0
          ? ""
          : compImagenes?.map((imagen) => {
              return (
                <div style={{ position: "relative" }} key={imagen.id}>
                  <Imagenes url={imagen.image} />
                  <button
                    className="eliminarImagen"
                    onClick={() => eliminandoImagen(imagen.id, imagen.titulo)}
                    type="button"
                  >
                    <span className="material-symbols-outlined add">close</span>
                  </button>
                </div>
              );
            })}
      </div>
      <button type="submit" className="crearProducto">
        Actualizar
      </button>
    </form>
  );
};
export default ProductoAModificar;