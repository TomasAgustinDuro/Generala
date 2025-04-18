import styles from "./board.module.css";
import { PcBoardProps } from "../utils/types";

function PcBoard({ tablero, todasJugadas, total, turn }: PcBoardProps) {
  console.log(turn);

  return (
    <div className={styles.containerBoard}>
      <h3
        style={{
          backgroundColor: turn == "pc" ? "green" : "transparent",
        }}
      >
        PC
      </h3>
      {todasJugadas.map((jugada) => (
        <p key={jugada} className={styles.boardP}>
          <strong>{jugada}:</strong> {tablero[jugada] ?? "-"}
        </p>
      ))}
      <p className={styles.total}>Total: {total(tablero)}</p>
    </div>
  );
}
export default PcBoard;
