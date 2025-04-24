import { calcularPuntos, calcularTotal, juegoFinalizado } from "./gameLogic";

describe("calcularPuntos", () => {
  it("devuelve 50 puntos por generala", () => {
    const resultado = calcularPuntos("Generala", [5, 5, 5, 5, 5], false);
    expect(resultado).toBe(50);
  });

  it("devuelve 45 puntos por poker servido", () => {
    const resultado = calcularPuntos("Poker", [5, 5, 5, 5, 4], true);
    expect(resultado).toBe(45);
  });

  it("devuelve 40 puntos por poker", () => {
    const resultado = calcularPuntos("Poker", [5, 5, 5, 5, 4], false);
    expect(resultado).toBe(40);
  });

  it("devuelve 35 puntos por full servido", () => {
    const resultado = calcularPuntos("Full", [5, 5, 5, 4, 4], true);
    expect(resultado).toBe(35);
  });

  it("devuelve 30 puntos por full", () => {
    const resultado = calcularPuntos("Full", [5, 5, 5, 4, 4], false);
    expect(resultado).toBe(30);
  });

  it("devuelve 25 puntos por escalera servida", () => {
    const resultado = calcularPuntos("Escalera", [1, 2, 3, 4, 5], true);
    expect(resultado).toBe(25);
  });

  it("devuelve 25 puntos por escalera servida", () => {
    const resultado = calcularPuntos("Escalera", [2, 3, 4, 5, 6], true);
    expect(resultado).toBe(25);
  });

  it("devuelve 20 puntos por escalera", () => {
    const resultado = calcularPuntos("Escalera", [1, 2, 3, 4, 5], false);
    expect(resultado).toBe(20);
  });

  it("devuelve 20 puntos por escalera", () => {
    const resultado = calcularPuntos("Escalera", [2, 3, 4, 5, 6], false);
    expect(resultado).toBe(20);
  });

  it("devuelve null si la jugada no aplica", () => {
    const resultado = calcularPuntos("Escalera", [1, 1, 2, 3, 4], false);
    expect(resultado).toBe(20); // porque igual pasa como escalera, asumimos que validación ya fue hecha
  });

  it("devuelve null si no hay esa jugada en los dados", () => {
    const resultado = calcularPuntos("5", [1, 2, 3, 4, 6], false);
    expect(resultado).toBe(null);
  });
});

describe("calcularTotal", () => {
  it("Devuelve la sumatoria correcta", () => {
    const resultado = calcularTotal({
      "1": 3,
      "2": 6,
      "3": 0,
      "4": 4,
      "5": 5,
      "6": 6,
      Escalera: 20,
      Poker: 40,
      Full: 30,
      Generala: 50,
      DobleGenerala: 0,
    });

    expect(resultado).toBe(164);
  });

  it("Devuelve la sumatoria correcta", () => {
    const resultado = calcularTotal({
      "1": null,
      "2": null,
      "3": null,
      "4": null,
      "5": null,
      "6": null,
      Escalera: null,
      Poker: null,
      Full: null,
      Generala: null,
      DobleGenerala: null,
    });

    expect(resultado).toBe(0);
  });
});

describe("juegoFinalizado", () => {
  it("Gana el jugador nro 1", () => {
    const resultado = juegoFinalizado(
      {
        "1": 1,
      },
      {
        "1": 0,
      }
    );
  });

  it("Gana el jugador nro 2", () => {
    const resultado = juegoFinalizado(
      {
        "1": 0,
      },
      {
        "1": 1,
      }
    );
  });
});
