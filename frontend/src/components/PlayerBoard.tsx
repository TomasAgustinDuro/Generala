import styles from "./board.module.css";
import { PlayerBoardProps, Tablero } from "../utils/types";

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
      const newTablero: Tablero = {
        ...tablero,
        [jugada]: 0,
      };
      setTablero(newTablero);
    } else {
      const newTablero: Tablero = {
        ...tablero,
        [jugada]: puntos,
      };
      setTablero(newTablero);
    }

    reiniciar();
  };

  return (
    <div className={styles.board}>
      <h3
        style={{
          backgroundColor: turn === jugadorActual ? "green" : "transparent",
        }}
      >
        Jugador {jugadorActual}
      </h3>
      <div className={styles.containerBoard}>
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
              <strong>{jugada[0].toUpperCase()}:</strong>{" "}
              {disponible ? puntos ?? "-" : tablero[jugada] ?? "-"}
            </p>
          );
        })}
      </div>
      <p className={styles.total}>Total: {total(tablero)}</p>
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
