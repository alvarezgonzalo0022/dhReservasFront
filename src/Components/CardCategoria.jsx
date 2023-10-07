import React, { useContext } from "react";
import "./CardCategoriaStyles.css";
import { ContextGlobal } from "./Utils/global.context";

const CardCategoria = (imagen) => {
  const { setInListAutosUbi, setInQuitarFiltro } = useContext(ContextGlobal);
  const filtrar = () => {
    try {
      fetch(
        `https://dhreservas-bd190ac8106b.herokuapp.com/productos/filtrarPorCategoria/${imagen.categoria}`
      )
        .then((res) => res.json())
        .then((data) => {
          setInListAutosUbi(ordenarImagenesPorTitulo(data));
          setInQuitarFiltro();
        });
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className={`cate ${imagen.categoria}`} onClick={filtrar}>
      <img
        src={imagen.imagen}
        alt="imagenCat"
        className={`imagenCate ${imagen.categoria}`}
      />
      <p className={`categoria ${imagen.categoria}`}>{imagen.categoria}</p>
    </div>
  );
};

export default CardCategoria;
