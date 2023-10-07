import { useContext } from "react";
import { ContextGlobal } from "./Utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FooterStyles.css";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const { menuPhone } = useContext(ContextGlobal);
  const menu = menuPhone === false;
  return (
    <footer className={`${menu ? "" : "desaparecer"}`}>
      <p className="nombreEmpresa">©2021 Digital Booking</p>
      <ul className="iconosFooter">
        <li className="iconoFooter">
          <FontAwesomeIcon icon={faFacebook} />
        </li>
        <li className="iconoFooter">
          <FontAwesomeIcon icon={faLinkedin} />
        </li>
        <li className="iconoFooter">
          <FontAwesomeIcon icon={faTwitter} />
        </li>
        <li className="iconoFooter">
          <FontAwesomeIcon icon={faInstagram} />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
