import { contarOcurrencias } from "../utils/dados";

export const posiblesJugadas = (
    dados: number[],
    tablero: Record<string, number | null>
  ) => {
    const conteo = contarOcurrencias(dados);
    const cantidades = Object.values(conteo);

    const dadosOrdenados = [...new Set(dados)].sort((a, b) => a - b);
    const posibleEscaleraUno = [1, 2, 3, 4, 5];
    const posibleEscaleraDos = [2, 3, 4, 5, 6];
    const posibleEscaleraTres = [1, 3, 4, 5, 6];

    const jugadas: string[] = [];

    if (cantidades.includes(5)) {
      if (tablero["Generala"] != null) {
        jugadas.push("DobleGenerala");
      } else {
        jugadas.push("Generala");
      }
    }

    if (cantidades.includes(4)) {
      jugadas.push("Poker");
    }

    if (cantidades.includes(3) && cantidades.includes(2)) {
      jugadas.push("Full");
    }
    if (
      dadosOrdenados.toString() === posibleEscaleraUno.toString() ||
      dadosOrdenados.toString() === posibleEscaleraDos.toString() ||
      dadosOrdenados.toString() === posibleEscaleraTres.toString()
    ) {
      jugadas.push("Escalera");
    }

    Object.entries(conteo).forEach(([key]) => {
      jugadas.push(key);
    });

    return jugadas;
  };
