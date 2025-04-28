import { crearTableroInicial } from "../logic/boards";
import { Tablero } from "./types";

export const createInitialBoardsPC = (
  quantity: number
): Record<string, Tablero> => {
  const tableros: Record<string, Tablero> = {};

  for (let i = 1; i <= quantity; i++) {
    tableros[i] = crearTableroInicial();
  }

  return tableros;
};
