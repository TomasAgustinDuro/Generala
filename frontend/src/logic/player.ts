import { posiblesJugadas } from "../logic/rules.js";
import { tirarDados } from "../utils/dados.js";
import {
  HandlePlayProps,
  HandleRemoveProps,
  HandleSaveProps,
} from "../utils/types.js";

export const handlePlay = ({ estado, setEstado, tablero }: HandlePlayProps) => {
  if (estado.tiradasRestantes === 0) return;

  const nuevaTirada = tirarDados(5 - estado.dadosGuardados.length);
  const dadosTotales = [...estado.dadosGuardados, ...nuevaTirada];
  const nuevasJugadas = posiblesJugadas(dadosTotales, tablero);

  setEstado((prev) => ({
    ...prev,
    dados: nuevaTirada,
    fueServida: prev.tiradasRestantes === 3,
    jugadas: nuevasJugadas,
    tiradasRestantes: prev.tiradasRestantes - 1,
  }));
};

export const handleSave = (
  index: number,
  { estado, setEstado }: HandleSaveProps
) => {
  const dadoSeleccionado = estado.dados[index];

  const nuevosDados = [...estado.dados];
  nuevosDados.splice(index, 1);

  setEstado((prev) => ({
    ...prev,
    dadosGuardados: [...prev.dadosGuardados, dadoSeleccionado],
    dados: nuevosDados,
  }));
};

export const handleRemove = (
  index: number,
  { estado, setEstado}: HandleRemoveProps
) => {
  const dadoSeleccionado = estado.dadosGuardados[index];

  const nuevosDadosGuardados = estado.dadosGuardados.filter(
    (_, i) => i != index
  );

  setEstado((prev) => ({
    ...prev,
    dadosGuardados: nuevosDadosGuardados,
    dados: [...prev.dados, dadoSeleccionado], 
  }));

};
