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
import { useParams } from "react-router-dom";
import { Tablero } from "../utils/types.js";
import { createInitialBoardsPC } from "../utils/setupPcPlayer.ts";

function Pc() {
  const { quantity } = useParams();

  const playerCount = parseInt(quantity || "1", 10);

  const [estadoJugador, setEstadoJugador] = useState<EstadoJugador>({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });

  const [turn, setTurn] = useState<string>("jugador1");

  const [tableros, setTableros] = useState<Record<string, Tablero>>({
    jugador1: crearTableroInicial(),
    ...createInitialBoardsPC(playerCount),
  });

  const ordenTurnos = Object.keys(tableros);

  const nextTurn = (): string => {
    const currentIndex = ordenTurnos.indexOf(turn);
    const siguiente = ordenTurnos[(currentIndex + 1) % ordenTurnos.length];
    setTurn(siguiente);
    return siguiente;
  };

  useEffect(() => {
    juegoFinalizado(tableros);
  }, [tableros]);

  useEffect(() => {
    if (turn !== "jugador1" && tableros[turn]) {
      setTimeout(() => {
        cpuPlayer({
          tablero: tableros[turn],
          setTablero: (nuevoTablero) =>
            setTableros((prev) => ({
              ...prev,
              [turn]: nuevoTablero,
            })),
          nextTurn,
        });
      }, 3000);
    }
  }, [turn, tableros]);

  return (
    <div className={styles.gameContainer}>
      <PlayerBoard
        jugadorActual="jugador1"
        todasJugadas={todasJugadas}
        calcularPuntos={calcularPuntos}
        jugadas={estadoJugador.jugadas}
        setTablero={(nuevoTablero) =>
          setTableros((prev) => ({
            ...prev,
            jugador1: nuevoTablero,
          }))
        }
        handlePlay={() =>
          handlePlay({
            estado: estadoJugador,
            setEstado: setEstadoJugador,
            tablero: tableros.jugador1,
          })
        }
        tiradasRestantes={estadoJugador.tiradasRestantes}
        tablero={tableros.jugador1}
        dadosGuardados={estadoJugador.dadosGuardados}
        dados={estadoJugador.dados}
        fueServida={estadoJugador.fueServida}
        turn={turn}
        reiniciar={() =>
          reiniciarTurnoPlayer({
            setEstado: setEstadoJugador,
            nextTurn,
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

      {Object.entries(tableros)
        .filter(([key]) => key !== "jugador1")
        .map(([key, value]) => (
          <PcBoard
            key={key}
            tablero={value}
            todasJugadas={todasJugadas}
            total={calcularTotal}
            turn={turn}
          />
        ))}
    </div>
  );
}

export default Pc;
