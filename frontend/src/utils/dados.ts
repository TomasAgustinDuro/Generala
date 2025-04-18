export const tirarDados = (cantidad: number): number[] => {
    return Array.from({ length: cantidad }, () => {
      return Math.ceil(Math.random() * 6);
    });
  };

export const contarOcurrencias = (dados: number[]) => {
  const result: Record<number, number> = {};
  dados.forEach((value) => {
    result[value] = (result[value] || 0) + 1;
  });
  return result;
};
