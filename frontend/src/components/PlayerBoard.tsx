import styles from "./board.module.css";
import { PlayerBoardProps } from "../utils/types";

function PlayerBoard({
  jugadorActual,
  todasJugadas,
  calcularPuntos,
  jugadas,
  setTablero,
  handlePlay,
  dados,
  turn,
  tiradasRestantes,
  tablero,
  dadosGuardados,
  reiniciar,
  fueServida,
  total,
}: PlayerBoardProps) {
  const handleSelectCasillero = (
    disponible: boolean,
    jugada: string,
    puntos: number | null
  ) => {
    if (tablero[jugada] !== null) return;
    if (!disponible) {
      setTablero((prev) => ({
        ...prev,
        [jugada]: 0,
      }));
    } else {
      setTablero((prev) => ({
        ...prev,
        [jugada]: puntos,
      }));
    }
    reiniciar();
  };


  return (
    <div>
      <div className={styles.containerBoard}>
        <h3
          style={{
            backgroundColor:
              turn === jugadorActual ? "green" : "transparent",
          }}
        >
          Jugador
        </h3>
        {todasJugadas.map((jugada) => {
          const jugadaHecha = tablero[jugada] !== null;
          const disponible = !jugadaHecha && jugadas.includes(jugada);
          const puntos =
            turn === jugadorActual
              ? calcularPuntos(
                  jugada,
                  [...dadosGuardados, ...dados],
                  fueServida
                )
              : null;

          return (
            <p
              key={jugada}
              className={styles.boardP}
              style={{
                backgroundColor:
                  turn === jugadorActual && disponible
                    ? "green"
                    : "transparent",
              }}
              onClick={() => {
                handleSelectCasillero(disponible, jugada, puntos);
              }}
            >
              <strong>{jugada}:</strong>{" "}
              {disponible ? puntos ?? "-" : tablero[jugada] ?? "--"}
            </p>
          );
        })}
        <p className={styles.total}>Total: {total(tablero)}</p>
      </div>
      {jugadorActual != "pc" && (
        <button
          onClick={() => handlePlay()}
          className={styles.playButton}
          disabled={tiradasRestantes === 0 || turn === "pc"}
        >
          Lanzar dados
        </button>
      )}
    </div>
  );
}
export default PlayerBoard;
