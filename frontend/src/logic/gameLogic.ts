import { contarOcurrencias } from "../utils/dados";
import { ReiniciarTurnoPlayerProps } from "../utils/types";

export const calcularPuntos = (
  jugada: string,
  dados: number[],
  fueServida: boolean
): number | null => {
  const conteo = contarOcurrencias(dados);
  const bonus = fueServida
    ? jugada !== "Generala" && jugada !== "DobleGenerala"
      ? 5
      : 0
    : 0;

  if (
    ["DobleGenerala", "Generala", "Poker", "Full", "Escalera"].includes(jugada)
  ) {
    if (jugada === "DobleGenerala") return 60;
    if (jugada === "Generala") return 50;
    if (jugada === "Poker") return 40 + bonus;
    if (jugada === "Full") return 30 + bonus;
    if (jugada === "Escalera") return 20 + bonus;

    return null;
  }

  if (conteo[Number(jugada)]) {
    return Number(jugada) * conteo[Number(jugada)];
  }
  return null;
};

export const calcularTotal = (tablero: Record<string, number | null>) =>
  Object.values(tablero)
    .filter((v): v is number => v !== null)
    .reduce((acc, curr) => acc + curr, 0);

export const juegoFinalizado = (
  tablero1: Record<string, number | null>,
  tablero2: Record<string, number | null>
) => {
  if (
    !Object.values(tablero1).includes(null) &&
    !Object.values(tablero2).includes(null)
  ) {
    const totalTablero1 = calcularTotal(tablero1);
    const totalTablero2 = calcularTotal(tablero2);

    if (totalTablero1 > totalTablero2) {
      alert("Juego finalizado, el ganador es: el jugador 1");
    } else if (totalTablero2 > totalTablero1) {
      alert("Juego finalizado, el ganador es: el jugador 2");
    } else {
      alert("Juego finalizado, ¡hay empate!");
    }

    setTimeout(() => {
      window.location.reload();
    }, 20000);
  }
};

export const reiniciarTurnoPlayer = ({
  setEstado,
  setTurn,
}: ReiniciarTurnoPlayerProps) => {
  setEstado({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });
  setTurn("pc");
};
