import { expect } from "vitest";
import { posiblesJugadas } from "./rules";

describe("posiblesJugadas", () => {
  it("Devuelve solo generala cuando esta disponible y los 5 dados son iguales", () => {
    const resultado = posiblesJugadas([5, 5, 5, 5, 5], {
      Generala: null,
    });

    expect(resultado).toContain("Generala");
  });

  it("Devuelve Doble Generala cuando la Generala ya fue hecha y los 5 dados son iguales", () => {
    const resultado = posiblesJugadas([5, 5, 5, 5, 5], {
      Generala: 50,
    });

    expect(resultado).toContain("DobleGenerala");
    expect(resultado).toContain("5");
  });

  it("Devuelve el valor más alto o más repetido, en este caso 4", () => {
    const resultado = posiblesJugadas([3, 2, 4, 4, 4], {
      "4": null,
    });

    expect(resultado).toContain("4");
    expect(resultado).toContain("2");
    expect(resultado).toContain("3");
  });
});
