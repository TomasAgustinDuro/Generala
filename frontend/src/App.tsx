import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import Pc from "./pages/Pc.tsx";
import Menu from "./pages/menu/Menu.tsx";
import MultijugadorLocal from "./pages/MultijugadorLocal.tsx";
import MidMenu from "./pages/MidMenu.tsx";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu/:mode" element={<MidMenu />} />
          <Route path="/Jugador/:quantity" element={<MultijugadorLocal />} />
          <Route path="/Pc/:quantity" element={<Pc />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
