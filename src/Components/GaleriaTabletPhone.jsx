import React from "react";
import { Carousel } from "react-carousel-minimal";
import ContentLoader from "react-content-loader";
import "./GaleriaTabletPhoneStyles.css";

const GaleriaTabletPhone = (listaImagenes) => {
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
  const data = [
    {
      image: "https://thumbs.gfycat.com/JovialMeagerBull-size_restricted.gif",
    },
  ];
  const slideNumberStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    right: "0px",
    bottom: "0px",
    top: "inherit",
    left: "inherit",
    padding: "17px 24px",
  };
  return (
    <div className="cajaGaleriaImagenesTabletPhone">
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {listaImagenes?.listaImagenes.length === 0 ? (
            <ContentLoader
              className="skeletonScreenImagen2"
              speed={1}
              width={"100%"}
              height={400}
              viewBox="0 0 100% 400"
              backgroundColor="#a2a0a0"
              foregroundColor="#ecebeb"
              style={{ marginBottom: "30px" }}
            >
              <rect width="100%" height="400" />
            </ContentLoader>
          ) : (
            <Carousel
              data={listaImagenes?.listaImagenes}
              time={3000}
              automatic={true}
              width="100%"
              height="400px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              dots={false}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={false}
              style={{
                textAlign: "center",
                minWidth: "100%",
                minHeight: "476px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GaleriaTabletPhone;
