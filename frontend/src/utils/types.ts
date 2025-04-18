export type EstadoJugador = {
  dados: number[];
  dadosGuardados: number[];
  fueServida: boolean;
  tiradasRestantes: number;
  jugadas: string[];
};

export type HandlePlayProps = {
  estado: EstadoJugador;
  setEstado: React.Dispatch<React.SetStateAction<EstadoJugador>>;
  tablero: Record<string, number | null>;
};

export type HandleSaveProps = {
  estado: EstadoJugador;
  setEstado: React.Dispatch<React.SetStateAction<EstadoJugador>>;
};

export type HandleRemoveProps = {
  estado: EstadoJugador;
  setEstado: React.Dispatch<React.SetStateAction<EstadoJugador>>;
};

export type ReiniciarTurnoPlayerProps = {
  setEstado: React.Dispatch<React.SetStateAction<EstadoJugador>>;
  setTurn: React.Dispatch<React.SetStateAction<"jugador" | "pc">>;
};

export type PcBoardProps = {
  tablero: Record<string, number | null>;
  todasJugadas: string[];
  turn: string;
  total: (tablero: Record<string, number | null>) => number;
};

export type PlayerBoardProps = {
  todasJugadas: string[];
  jugadas: string[];
  dados: number[];
  dadosGuardados: number[];
  turn: string;
  tablero: Record<string, number | null>;
  reiniciar: () => void;
  setTablero: React.Dispatch<
    React.SetStateAction<Record<string, number | null>>
  >;
  calcularPuntos: (
    jugada: string,
    dados: number[],
    fueServida: boolean
  ) => number | null;
  handlePlay: () => void;
  tiradasRestantes: number;
  reiniciarTurno?: () => void;
  jugadorActual: string;
  fueServida: boolean;
  total: (tablero: Record<string, number | null>) => number;
};

export type PlayPcProps = {
  tablero: Record<string, number | null>;
  setTablero: React.Dispatch<
    React.SetStateAction<Record<string, number | null>>
  >;
  setTurn: React.Dispatch<
    React.SetStateAction<"jugador" | "pc">
  >;
};