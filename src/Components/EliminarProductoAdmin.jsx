import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { components } from "react-select";
import Select from "react-select";
import "./EliminarProductoAdminStyles.css";
import CardEliminarProducto from "./CardEliminarProducto";

const EliminarProductoAdmin = () => {
  const [dataAutos, setDataAutos] = useState([]);
  const [start, setStart] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [href, setHref] = useState(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarProductosPaginados`)

  function fetchInicialProductos() {
    try {
      fetch(href)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setDataAutos(data.productos);
          setStart(data.next.start);
          setHref(data.next.href);
          setHasMore(data.hasMore);
        })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchInicialProductos();
  }, []);

  function fetchObservadorProductos() {
    // console.log(href)
    try {
      fetch(href)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setDataAutos(dataAutos.concat(data.productos));
          setStart(data.next.start);
          setHref(data.next.href);
          setHasMore(data.hasMore);
        })
    } catch (error) {
      console.error(error);
    }
  }

  function handleObserver(entries) {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      fetchObservadorProductos();
    }
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (start && hasMore) {
      observer.observe(document.getElementById("observador"));
    }
    return () => observer.disconnect();
  }, [start, hasMore]);

  function fetchSubmitProductos() {
    setStart(null)
    setHref(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarProductosPaginados?start=null`+"&titulo="+dataEliminarProducto.titulo+"&categoria="+dataEliminarProducto.categoria+"&ciudad="+dataEliminarProducto.ciudad)
    try {
      fetch(`https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarProductosPaginados?start=null`+"&titulo="+dataEliminarProducto.titulo+"&categoria="+dataEliminarProducto.categoria+"&ciudad="+dataEliminarProducto.ciudad)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setDataAutos(data.productos);
          setStart(data.next.start);
          setHref(data.next.href);
          setHasMore(data.hasMore);
        })
    } catch (error) {
      console.error(error);
    }
  }

  // const [dataAutosTitulos, setDataAutosTitulos] = useState([]);

  // useEffect(() => {
  //   try {
  //     fetch("http://ec2-3-22-186-180.us-east-2.compute.amazonaws.com:8080/productos")
  //       .then((res) => res.json())
  //       .then((data) => setDataAutosTitulos(data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const [dataCiudades, setDataCiudades] = useState([]);

  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/ciudades")
        .then((res) => res.json())
        .then((data) => setDataCiudades(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [categoryList, setCategoryList] = useState([]);
  
  useEffect(() => {
    try {
      fetch("https://dhreservas-bd190ac8106b.herokuapp.com/categorias")
        .then((res) => res.json())
        .then((data) => setCategoryList(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [dataEliminarProducto, setDataEliminarProducto] = useState({
    titulo: null,
    categoria: null,
    ciudad: null,
  });
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

  function handleSubmit(e) {
    e.preventDefault();
    fetchSubmitProductos();
  }
  const newData = dataAutos?.map((item) => {
    const sortedImages = item.imagenes.sort((a, b) => {
      const aIndex = parseInt(a.titulo[a.titulo.length - 1], 10);
      const bIndex = parseInt(b.titulo[b.titulo.length - 1], 10);
      return aIndex - bIndex;
    });

    return {
      ...item,
      imagenes: sortedImages,
    };
  })
  return (
    <div className="eliminarProductoAdmin">
      <form className="filtrarEliminado" onSubmit={handleSubmit}>
        {/* <Select
          onChange={(e) => {
            setDataEliminarProducto({
              ...dataEliminarProducto,
              titulo: e.value
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
          options={
            dataAutosTitulos.length
              ? dataAutosTitulos.map((auto) => ({
                  label: auto.titulo,
                  value: auto.titulo,
                  key: auto.idProducto,
                }))
              : null
          }
          className="selectEliminarAdmin"
          placeholder="Seleccionar vehiculo"
          menuPosition="fixed"
          menuPlacement="bottom"
          components={{
            Option: TextOptionCate,
            IndicatorSeparator: () => null,
            SingleValueCate,
          }}
        /> */}
        <input className="inputsCrearModificados" name="tituloDeProducto" placeholder="Ingresar titulo de producto" onChange={(e) =>
            setDataEliminarProducto({
              ...dataEliminarProducto,
              titulo: e.target.value
            })
          }>
          </input>
        <Select
          options={
            categoryList.length
              ? categoryList.map((categoria) => ({
                  label: categoria.titulo,
                  value: categoria.titulo,
                  key: categoria.idCategoria,
                }))
              : null
          }
          className="selectEliminarAdmin"
          placeholder="Seleccionar categoria"
          components={{
            IndicatorSeparator: () => null,
            Option: TextOptionCate,
            SingleValueCate,
          }}
          onChange={(e) =>
            setDataEliminarProducto({
              ...dataEliminarProducto,
              categoria: e.value
            })
          }
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
        <Select
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
          placeholder={`Seleccionar ciudad`}
          className="selectEliminarAdmin"
          onChange={(e) =>
            // setDataEliminarProducto({
            //   ...dataEliminarProducto,
            //   ciudad: e.value,
            // })
            {
              setDataEliminarProducto({
                ...dataEliminarProducto,
                ciudad: e.value
              })
              // console.log(dataEliminarProducto)
            }
          }
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
        <button className="buscarProductoEliminar" type="submit">
          <p>Buscar</p>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      <div className="listCardProductos">
        {dataAutos?.length === 0 ? (
          <div>
            <p style={{fontSize: "18px"}}>Cargando los productos o no hay productos creados.</p>
            <div className="bulb">
              <svg
                width="60pt"
                height="60pt"
                version="1.1"
                viewBox="0 0 1200 1200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m930 552.86h-660c-6.9297 0-13.191-4.168-15.836-10.582-2.6602-6.4102-1.1875-13.777 3.7148-18.684l289.72-289.7c4.1367-4.1367 10.078-5.875 15.836-4.6211 5.707 1.2734 10.379 5.375 12.387 10.883 3.7031 10.164 13.43 16.996 24.176 16.996s20.473-6.832 24.191-17.008c2.0078-5.5078 6.6797-9.5938 12.406-10.863 5.6602-1.2539 11.668 0.48437 15.82 4.6211l289.7 289.7c4.9062 4.9062 6.3789 12.27 3.7148 18.684-2.6445 6.4062-8.9062 10.574-15.836 10.574zm-618.62-34.285h577.23l-245.5-245.51c-11.102 11.469-26.586 18.367-43.109 18.367-16.539 0-32.008-6.8984-43.109-18.348z"></path>
                  <path d="m986.48 1028.6h-772.97c-23.203 0-42.086-18.883-42.086-42.086v-425.82c0-23.203 18.883-42.09 42.086-42.09h772.97c23.203 0 42.086 18.887 42.086 42.09v425.82c0 23.203-18.883 42.086-42.086 42.086zm-772.97-475.71c-4.3008 0-7.8008 3.5-7.8008 7.8047v425.82c0 4.3008 3.5 7.8008 7.8008 7.8008h772.97c4.3008 0 7.8008-3.5 7.8008-7.8008v-425.82c0-4.3047-3.5-7.8047-7.8008-7.8047z"></path>
                  <path d="m599.92 935.74c-89.332 0-162-72.758-162-162.17 0-89.414 72.672-162.17 162-162.17 89.414 0 162.17 72.758 162.17 162.17-0.003906 89.414-72.758 162.17-162.17 162.17zm0-290.05c-70.43 0-127.72 57.371-127.72 127.89 0 70.512 57.289 127.89 127.72 127.89 70.512 0 127.89-57.371 127.89-127.89-0.003907-70.516-57.375-127.89-127.89-127.89z"></path>
                  <path d="m576.71 838.07c-4.5547 0-8.9062-1.8086-12.121-5.0234l-48.113-48.129c-6.6953-6.6953-6.6953-17.543 0-24.242 6.6953-6.6953 17.543-6.6953 24.242 0l35.992 36.012 82.582-82.582c6.6953-6.6953 17.543-6.6953 24.242 0 6.6953 6.6953 6.6953 17.543 0 24.242l-94.703 94.703c-3.2148 3.2109-7.5703 5.0195-12.121 5.0195z"></path>
                  <path d="m600 291.43c-25.113 0-47.777-15.887-56.383-39.559-2.3633-6.1445-3.6172-13.125-3.6172-20.441 0-33.082 26.918-60 60-60s60 26.918 60 60c0 7.3477-1.2383 14.312-3.6992 20.727-8.5391 23.387-31.207 39.273-56.301 39.273zm0-85.715c-14.18 0-25.715 11.535-25.715 25.715 0 3.0625 0.50391 5.9766 1.4414 8.4375 3.8008 10.445 13.527 17.277 24.273 17.277s20.473-6.832 24.191-17.008c1.0391-2.6992 1.5234-5.6094 1.5234-8.707 0-14.18-11.535-25.715-25.715-25.715z"></path>
                </g>
              </svg>
            </div>
          </div>
        ) : (
          newData?.map((auto) => (
            <CardEliminarProducto autoObjeto={auto} key={auto.idProducto} />
          ))
          
        )}
        {/* {console.log(dataAutos)} */}
      </div>
      {dataAutos?.length === 0 ? "" : hasMore ? <div id="observador"></div> : <div id="observador" style={{textAlign:"center"}}>No se encuentran mas productos</div>}
    </div>
  );
};

export default EliminarProductoAdmin;
