import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import ContentLoader from "react-content-loader";
import "./GaleriaStyles.css";
import { ContextGlobal } from "./Utils/global.context";

const Galeria = (listaImagenes) => {
  // const [dataAutos, setDataAutos] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     fetch(`http://localhost:8080/productos/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setDataAutos(data);
  //       });
  //   }
  //   fetchData();
  // }, [id]);
  // const { id } = useParams();
  // console.log(listaImagenes?.listaImagenes);

  const { galeriaImagenes, setInGaleriaImagenes } = useContext(ContextGlobal);
  const galeria = galeriaImagenes === false;
  const changeGaleria = () => {
    if (!galeria) {
      setInGaleriaImagenes();
      body[0].style.overflow = "";
    }
  };
  const body = document.getElementsByTagName("body");
  const data = [
    {
      image: "https://thumbs.gfycat.com/JovialMeagerBull-size_restricted.gif",
    },
  ];
  // dataAutoSolo.imagenes?.[0].image
  // console.log(imagenes.length === 0 ? data : imagenes)

  const slideNumberStyle = {
    fontSize: "16px",
    fontWeight: "700",
  };
  return (
    <div className="cajaGaleriaImagenes">
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {listaImagenes?.listaImagenes.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen1"
              speed={1}
              width={638}
              height={476}
              viewBox="0 0 638 476"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="638" height="476" />
            </ContentLoader>
          ) : (
            <Carousel
              data={listaImagenes?.listaImagenes}
              width="638px"
              height="323px"
              radius="10px 10px 0px 0px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              dots={false}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="175px"
              style={{
                textAlign: "center",
                maxWidth: "638px",
                maxHeight: "476px",
              }}
            />
          )}

          <button className="cerrarGaleria" onClick={changeGaleria}>
            <span className="material-symbols-outlined"> close </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Galeria;
