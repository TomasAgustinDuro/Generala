import "./App.css";
import { StrictMode } from "react";
import Pc from "./pages/Pc";
import Menu from "./pages/menu/menu";
import MultijugadorLocal from "./pages/multijugadorLocal";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        {" "}
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
