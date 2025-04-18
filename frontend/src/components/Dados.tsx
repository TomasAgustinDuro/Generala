import styles from "./dados.module.css";

type DadoProps = {
  valor: number; 
};

const Dado = ({ valor }: DadoProps) => {
  const getPuntos = (valor: number) => {
    switch (valor) {
      case 1:
        return [[1, 1]];
      case 2:
        return [
          [0, 0],
          [2, 2],
        ];
      case 3:
        return [
          [0, 0],
          [1, 1],
          [2, 2],
        ];
      case 4:
        return [
          [0, 0],
          [0, 2],
          [2, 0],
          [2, 2],
        ];
      case 5:
        return [
          [0, 0],
          [0, 2],
          [1, 1],
          [2, 0],
          [2, 2],
        ];
      case 6:
        return [
          [0, 0],
          [1, 0],
          [2, 0],
          [0, 2],
          [1, 2],
          [2, 2],
        ];
      default:
        return [];
    }
  };

  const puntos = getPuntos(valor);

  return (
    <div className={styles.dado}>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const isPunto = puntos.some(([r, c]) => r === row && c === col);
          return (
            <div
              key={`${row}-${col}`}
              className={`${styles.celda} ${isPunto ? styles.punto : ""}`}
            ></div>
          );
        })
      )}
    </div>
  );
};

export default Dado;
