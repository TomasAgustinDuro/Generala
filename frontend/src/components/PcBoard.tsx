import styles from "./board.module.css";
import { PcBoardProps } from "../utils/types";

function PcBoard({
  tablero,
  todasJugadas,
  total,
  turn,
  jugadorActual,
}: PcBoardProps) {
  return (
    <div className={styles.board}>
      <h3
        style={{
          backgroundColor: turn == jugadorActual ? "green" : "transparent",
        }}
      >
        PC
      </h3>
      <div className={styles.containerBoard}>
        {todasJugadas.map((jugada) => (
          <p key={jugada} className={styles.boardP}>
            <strong>{jugada[0].toUpperCase()}:</strong> {tablero[jugada] ?? "-"}
          </p>
        ))}
      </div>
      <p className={styles.total}>Total: {total(tablero)}</p>
    </div>
  );
}
export default PcBoard;
