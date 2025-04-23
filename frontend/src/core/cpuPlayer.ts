import { contarOcurrencias, tirarDados } from "../utils/dados";
import { todasJugadas } from "../constants/juego";
import { calcularPuntos} from "../logic/gameLogic";
import { posiblesJugadas } from "../logic/rules";
import { PlayPcProps } from "../utils/types";


export const cpuPlayer = ({ tablero, setTablero, setTurn }: PlayPcProps) => {
  let mejor = "";
  let dadosTotales: number[] = [];
  let dadosGuardadosPc: number[] = [];
  let fueTachada = false;
  let fueServidaFinal = false;

  for (let i = 0; i < 3; i++) {
    fueServidaFinal = i === 0;

    if (
      mejor &&
      calcularPuntos(mejor, dadosTotales, (fueServidaFinal = i === 0))! >= 40
    ) {
      break;
    }

    const nuevosDados = tirarDados(5 - dadosGuardadosPc.length);
    dadosTotales = [...dadosGuardadosPc, ...nuevosDados];

    const posibles = posiblesJugadas(dadosTotales, tablero);

    const nuevosGuardados = aplicarHeuristica(dadosTotales, posibles);

    nuevosGuardados.forEach((dado) => {
      const yaGuardados = dadosGuardadosPc.filter((d) => d === dado).length;
      const disponibles = dadosTotales.filter((d) => d === dado).length;

      if (yaGuardados < disponibles) {
        dadosGuardadosPc.push(dado);
      }
    });

    const disponibles = posibles.filter((jugada) => tablero[jugada] === null);

    if (disponibles.length > 0) {
      mejor = disponibles.reduce((mejorActual, jugadaActual) => {
        const puntosActual = calcularPuntos(
          jugadaActual,
          dadosTotales,
          (fueServidaFinal = i === 0)
        );
        const puntosMejor = calcularPuntos(
          mejorActual,
          dadosTotales,
          (fueServidaFinal = i === 0)
        );

        if (puntosActual === null) return mejorActual;
        if (puntosMejor === null) return jugadaActual;

        return puntosActual > puntosMejor ? jugadaActual : mejorActual;
      }, disponibles[0]);

    }
  }

  if (!mejor) {
    // Obtener jugadas libres
    const jugadasLibres = Object.entries(tablero)
      .filter(([_, valor]) => valor === null)
      ?.map(([clave]) => clave);

    const jugadaMasDebil = todasJugadas.find((j) => jugadasLibres.includes(j));

    if (jugadaMasDebil) {
      mejor = jugadaMasDebil;
      fueTachada = true;
    }
  }

  const puntosFinales = fueTachada
    ? 0
    : calcularPuntos(mejor, dadosTotales, fueServidaFinal);


  setTablero((prev) => ({
    ...prev,
    [mejor]: puntosFinales === null ? 0 : puntosFinales,
  }));

  return setTurn('jugador1')

};

const aplicarHeuristica = (
  dados: number[],
  jugadasPosibles: string[]
): number[] => {
  const conteo = contarOcurrencias(dados);

  if (
    jugadasPosibles.includes("Generala") ||
    jugadasPosibles.includes("Poker")
  ) {
    const [valor, cantidad] =
      Object.entries(conteo).find(([_, c]) => c >= 4) ?? [];
    return valor ? Array(Number(cantidad)).fill(Number(valor)) : [];
  }

  if (jugadasPosibles.includes("Full")) {
    const triples = Object.entries(conteo).filter(([_, c]) => c === 3);
    const pares = Object.entries(conteo).filter(([_, c]) => c === 2);

    const valorTriple = triples[0]?.[0];
    const valorPar = pares[0]?.[0];

    return [
      ...Array(3).fill(Number(valorTriple)),
      ...Array(2).fill(Number(valorPar)),
    ].filter(Boolean);
  }

  if (jugadasPosibles.includes("Escalera")) {
    const unicos = [...new Set(dados)].sort((a, b) => a - b);
    return unicos;
  }

  const mejoresNumeros = ["6", "5", "4", "3", "2", "1"];
  for (const num of mejoresNumeros) {
    if (jugadasPosibles.includes(num)) {
      return dados.filter((d) => d === Number(num));
    }
  }

  return [];
};
