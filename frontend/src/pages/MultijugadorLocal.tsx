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
import PlayerBoard from "../components/PlayerBoard.js";
import Dado from "../components/Dados.tsx";
import {
  createInitialBoards,
  createInitialStatesPlayers,
} from "../utils/setupPlayers.ts";
import { Tablero } from "../utils/types.ts";
import { useParams } from "react-router-dom";

function MultijugadorLocal() {
  const { quantity } = useParams();

  // Convert to number and use a default if invalid
  const playerCount = parseInt(quantity || "2", 10);
  const [statePlayers, setStatePlayers] = useState(
    createInitialStatesPlayers(playerCount)
  );
  const [tableros, setTableros] = useState<Record<string, Tablero>>(
    createInitialBoards(playerCount)
  );
  const [jugadorActual, setJugadorActual] = useState("1");

  const [turn, setTurn] = useState<string>("1");

  useEffect(() => {
    const entry = Object.entries(statePlayers).find(([id, _]) => id === turn);
    if (entry) {
      const [playerId, _] = entry;
      setJugadorActual(playerId);
    }
  }, [turn]);

  useEffect(() => {
    juegoFinalizado(tableros);
  }, [tableros]);

  const nextTurn = (): string => {
    const currentId = parseInt(turn);
    const siguiente = ((currentId % playerCount) + 1).toString();
    setTurn(siguiente);
    return siguiente;
  };

  return (
    <div className={styles.gameContainer}>
      {Object.entries(statePlayers).map(([id, estado]) => (
        <PlayerBoard
          jugadorActual={id}
          todasJugadas={todasJugadas}
          calcularPuntos={calcularPuntos}
          jugadas={estado.jugadas}
          setTablero={(nuevoTablero) =>
            setTableros((prev) => ({
              ...prev,
              [id]: nuevoTablero,
            }))
          }
          handlePlay={() =>
            handlePlay({
              estado: estado,
              setEstado: (newEstadoOrFunction) => {
                setStatePlayers((prevState) => {
                  // Handle both cases: direct value or updater function
                  const finalNewEstado =
                    typeof newEstadoOrFunction === "function"
                      ? newEstadoOrFunction(prevState[id])
                      : newEstadoOrFunction;

                  return {
                    ...prevState,
                    [id]: finalNewEstado,
                  };
                });
              },
              tablero: tableros[id],
            })
          }
          tiradasRestantes={estado.tiradasRestantes}
          tablero={tableros[id]}
          dadosGuardados={estado.dadosGuardados}
          dados={estado.dados}
          fueServida={estado.fueServida}
          turn={turn}
          reiniciar={() =>
            reiniciarTurnoPlayer({
              setEstado: (newEstadoOrFunction) => {
                setStatePlayers((prevState) => {
                  // Handle both cases: direct value or updater function
                  const finalNewEstado =
                    typeof newEstadoOrFunction === "function"
                      ? newEstadoOrFunction(prevState[id])
                      : newEstadoOrFunction;

                  return {
                    ...prevState,
                    [id]: finalNewEstado,
                  };
                });
              },
              nextTurn: () => nextTurn(),
            })
          }
          total={calcularTotal}
        />
      ))}

      <div className={styles.firstPart}>
        <div>
          {
            <p>
              Tiradas restantes: {statePlayers[jugadorActual].tiradasRestantes}
            </p>
          }
        </div>
        <div className={styles.dadosContainer}>
          <div>
            {statePlayers[jugadorActual].dados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleSave(index, {
                    estado: statePlayers[jugadorActual],
                    setEstado: (newEstadoOrFunction) => {
                      setStatePlayers((prevState) => {
                        const finalNewEstado =
                          typeof newEstadoOrFunction === "function"
                            ? newEstadoOrFunction(prevState[jugadorActual])
                            : newEstadoOrFunction;

                        return {
                          ...prevState,
                          [jugadorActual]: finalNewEstado,
                        };
                      });
                    },
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
          <div className={styles.dadosGuardadosContainer}>
            {statePlayers[jugadorActual].dadosGuardados.map((num, index) => (
              <button
                key={index}
                onClick={() =>
                  handleRemove(index, {
                    estado: statePlayers[jugadorActual],
                    setEstado: (newEstadoOrFunction) => {
                      setStatePlayers((prevState) => {
                        const finalNewEstado =
                          typeof newEstadoOrFunction === "function"
                            ? newEstadoOrFunction(prevState[jugadorActual])
                            : newEstadoOrFunction;

                        return {
                          ...prevState,
                          [jugadorActual]: finalNewEstado,
                        };
                      });
                    },
                  })
                }
              >
                <Dado valor={num} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MultijugadorLocal;
