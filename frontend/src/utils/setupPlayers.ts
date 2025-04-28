import { crearTableroInicial } from "../logic/boards";
import { Player, EstadoJugador, Tablero } from "../utils/types";

export const createPlayers = (quantity: number): Player[] => {
  return Array.from({ length: quantity }, (_, i) => ({
    id: (i + 1).toString(),
  }));
};

export const createInitialStatesPlayers = (
  quantity: number
): Record<string, EstadoJugador> => {
  const estados: Record<string, EstadoJugador> = {};

  for (let i = 1; i <= quantity; i++) {
    estados[i.toString()] = {
      dados: [],
      dadosGuardados: [],
      tiradasRestantes: 3,
      fueServida: false,
      jugadas: [],
    };
  }
  return estados;
};

export const createInitialBoards = (
  quantity: number
): Record<string, Tablero> => {
  const tableros: Record<string, Tablero> = {};

  for (let i = 1; i <= quantity; i++) {
    tableros[i.toString()] = crearTableroInicial();
  }
  return tableros;
};

console.log(createInitialStatesPlayers(3));
console.log(createPlayers(3));
