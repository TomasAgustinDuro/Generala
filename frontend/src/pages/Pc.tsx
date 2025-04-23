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
import { cpuPlayer } from "../core/cpuPlayer.ts";
import { crearTableroInicial } from "../logic/boards.js";
import PlayerBoard from "../components/PlayerBoard.js";
import PcBoard from "../components/PcBoard.js";
import { EstadoJugador } from "../utils/types.js";
import Dado from "../components/Dados.tsx";

function Pc() {
  const [estadoJugador, setEstadoJugador] = useState<EstadoJugador>({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });

  const [turn, setTurn] = useState<"jugador1" | "jugador2">("jugador1");
  const [TableroJugador, setTableroJugador] = useState(crearTableroInicial);
  const [TableroJugadorPc, setTableroJugadorPc] = useState(crearTableroInicial);

  useEffect(() => {
    juegoFinalizado(TableroJugador, TableroJugadorPc);
  }, [TableroJugador, TableroJugadorPc]);

  useEffect(() => {
    if (turn === "jugador2") {
      setTimeout(() => {
        cpuPlayer({
          tablero: TableroJugadorPc,
          setTablero: setTableroJugadorPc,
          setTurn,
        });
      }, 3000);
    }
  }, [turn]);

  return (
    <div className={styles.gameContainer}>
      <PlayerBoard
        jugadorActual="jugador1"
        todasJugadas={todasJugadas}
        calcularPuntos={calcularPuntos}
        jugadas={estadoJugador.jugadas}
        setTablero={setTableroJugador}
        handlePlay={() =>
          handlePlay({
            estado: estadoJugador,
            setEstado: setEstadoJugador,
            tablero: TableroJugador,
          })
        }
        tiradasRestantes={estadoJugador.tiradasRestantes}
        tablero={TableroJugador}
        dadosGuardados={estadoJugador.dadosGuardados}
        dados={estadoJugador.dados}
        fueServida={estadoJugador.fueServida}
        turn={turn}
        reiniciar={() =>
          reiniciarTurnoPlayer({
            setEstado: setEstadoJugador,
            setTurn,
          })
        }
        total={calcularTotal}
      />

      <div className={styles.firstPart}>
        <div>{<p>Tiradas restantes: {estadoJugador.tiradasRestantes}</p>}</div>
        <div className={styles.dadosContainer}>
          <div>
            {estadoJugador.dados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleSave(index, {
                    estado: estadoJugador,
                    setEstado: setEstadoJugador,
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
          <div className={styles.dadosGuardadosContainer}>
            {estadoJugador.dadosGuardados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleRemove(index, {
                    estado: estadoJugador,
                    setEstado: setEstadoJugador,
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <PcBoard
        todasJugadas={todasJugadas}
        tablero={TableroJugadorPc}
        total={calcularTotal}
        turn={turn}
      />
    </div>
  );
}
export default Pc;
