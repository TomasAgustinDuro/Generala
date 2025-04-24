import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import Pc from "./pages/Pc.tsx";
import Menu from "./pages/menu/menu.tsx";
import MultijugadorLocal from "./pages/multijugadorLocal.tsx";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="Pc" element={<Pc />} />
          <Route path="Jugador" element={<MultijugadorLocal />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
