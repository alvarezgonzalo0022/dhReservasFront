import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import CreateAccount from "./Routes/CreateAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./Components/Utils/global.context";
import Producto from "./Routes/Producto";
import Reserva from "./Routes/Reserva";
import ReservaExitosa from "./Routes/ReservaExitosa";
import Administracion from "./Routes/Administracion";
import ProductoCreado from "./Routes/ProductoCreado";
import MisReservas from "./Routes/MisReservas";
import ReservaEliminada from "./Routes/ReservaEliminada";
import ProductoEliminado from "./Routes/ProductoEliminado";
import ProductoActualizado from "./Routes/ProductoActualizado";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/producto/:id/reserva" element={<Reserva />} />
          <Route
            path="/producto/:id/reserva/reservaExitosa"
            element={<ReservaExitosa />}
          />
          <Route path="/:userId/reservas" element={<MisReservas />} />
          <Route
            path="/:userId/reservas/eliminacionReservaExitosa"
            element={<ReservaEliminada />}
          />
          <Route
            path="/administracion/productoCreado"
            element={<ProductoCreado />}
          />
          <Route
            path="/administracion/productoEliminado"
            element={<ProductoEliminado />}
          />
          <Route
            path="/administracion/productoActualizado"
            element={<ProductoActualizado />}
          />
          <Route path="/administracion" element={<Administracion />} />
        </Route>
      </Routes>
    </ContextProvider>
  </BrowserRouter>
);
