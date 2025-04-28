import { contarOcurrencias } from "../utils/dados";
import { ReiniciarTurnoPlayerProps, Tableros } from "../utils/types";

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

export const juegoFinalizado = (tableros: Tableros) => {
  console.log("tableros", tableros);
  const juegoTerminado = Object.values(tableros).every(
    (tab) => !Object.values(tab).includes(null)
  );

  if (juegoTerminado) {
    const puntajes = Object.entries(tableros).map(([id, tablero]) => {
      const total = Object.values(tablero)
        .filter((v): v is number => v !== null)
        .reduce((acc, val) => acc + val, 0);

      return { id, total };
    });

    const ganador = puntajes.reduce((max, actual) =>
      actual.total > max.total ? actual : max
    );

    alert(
      `El ganador es el jugador ${ganador.id} con un total de ${ganador.total} puntos!`
    );

    setTimeout(() => {
      window.location.reload();
    }, 20000);
  }
};

export const reiniciarTurnoPlayer = ({
  setEstado,
  nextTurn,
}: ReiniciarTurnoPlayerProps) => {
  setEstado({
    dados: [],
    dadosGuardados: [],
    tiradasRestantes: 3,
    fueServida: false,
    jugadas: [],
  });
  nextTurn();
};
