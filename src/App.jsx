import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ContextGlobal } from './Components/Utils/global.context';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuPhone } = useContext(ContextGlobal)
  const menu = menuPhone === false

  useEffect(() => {
    if (location.pathname === '/'){
      navigate("/home");
    }
  })
  
  return (
    <div className="contenedor">
      <Header/>
      <main className={`${ menu ? '' : 'desaparecer'}`}>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
