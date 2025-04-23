import { useState, useEffect } from "react";
import styles from "./game.module.css";
import { handlePlay, handleSave, handleRemove } from "../logic/player.js";
import { todasJugadas } from "../constants/juego.js";
import {
  juegoFinalizado,
  calcularTotal,
  calcularPuntos,
  reiniciarTurnoPlayer,
} from "../logic/gameLogic.js";
import { crearTableroInicial } from "../logic/boards.js";
import PlayerBoard from "../components/PlayerBoard.js";
import { EstadoJugador } from "../utils/types.js";
import Dado from "../components/Dados.tsx";

function MultijugadorLocal() {
  const [estadoJugador1, setEstadoJugador1] = useState<EstadoJugador>({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });

  const [estadoJugador2, setEstadoJugador2] = useState<EstadoJugador>({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });

  const [turn, setTurn] = useState<"jugador1" | "jugador2">("jugador1");
  const [TableroJugador1, setTableroJugador1] = useState(crearTableroInicial);
  const [TableroJugador2, setTableroJugador2] = useState(crearTableroInicial);

  useEffect(() => {
    juegoFinalizado(TableroJugador1, TableroJugador2);
  }, [TableroJugador1, TableroJugador2]);

  const estadoActual = turn === "jugador1" ? estadoJugador1 : estadoJugador2;
  const setEstadoActual =
  turn === "jugador1" ? setEstadoJugador1 : setEstadoJugador2;

  return (
    <div className={styles.gameContainer}>
      <PlayerBoard
        jugadorActual="jugador1"
        todasJugadas={todasJugadas}
        calcularPuntos={calcularPuntos}
        jugadas={estadoJugador1.jugadas}
        setTablero={setTableroJugador1}
        handlePlay={() =>
          handlePlay({
            estado: estadoJugador1,
            setEstado: setEstadoJugador1,
            tablero: TableroJugador1,
          })
        }
        tiradasRestantes={estadoJugador1.tiradasRestantes}
        tablero={TableroJugador1}
        dadosGuardados={estadoJugador1.dadosGuardados}
        dados={estadoJugador1.dados}
        fueServida={estadoJugador1.fueServida}
        turn={turn}
        reiniciar={() =>
          reiniciarTurnoPlayer({
            setEstado: setEstadoJugador1,
            setTurn,
          })
        }
        total={calcularTotal}
      />

      <div className={styles.firstPart}>
        <div>{<p>Tiradas restantes: {estadoActual.tiradasRestantes}</p>}</div>
        <div className={styles.dadosContainer}>
          <div>
            {estadoActual.dados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleSave(index, {
                    estado: estadoActual,
                    setEstado: setEstadoActual,
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
          <div className={styles.dadosGuardadosContainer}>
            {estadoActual.dadosGuardados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleRemove(index, {
                    estado: estadoActual,
                    setEstado: setEstadoActual,
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <PlayerBoard
        jugadorActual="jugador2"
        todasJugadas={todasJugadas}
        calcularPuntos={calcularPuntos}
        jugadas={estadoJugador2.jugadas}
        setTablero={setTableroJugador2}
        handlePlay={() =>
          handlePlay({
            estado: estadoJugador2,
            setEstado: setEstadoJugador2,
            tablero: TableroJugador2,
          })
        }
        tiradasRestantes={estadoJugador2.tiradasRestantes}
        tablero={TableroJugador2}
        dadosGuardados={estadoJugador2.dadosGuardados}
        dados={estadoJugador2.dados}
        fueServida={estadoJugador2.fueServida}
        turn={turn}
        reiniciar={() =>
          reiniciarTurnoPlayer({
            setEstado: setEstadoJugador2,
            setTurn,
          })
        }
        total={calcularTotal}
      />
    </div>
  );
}
export default MultijugadorLocal;
