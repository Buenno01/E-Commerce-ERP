import { describe, expect, test } from "vitest";
import { MoneyVO } from "@products/domain/value-objects/money.vo";

describe("PRODUCTS:VALUE_OBJECT MoneyVO", () => {
  test("With negative amount value", () => {
    expect(() => new MoneyVO(-1, "BRL")).toThrow();
  });

  test("With currency code not 3 characters length", () => {
    const invalidValues = [
      "B",
      "BR",
      "BRLB",
      "BRLBR",
      "minha terra tem palmeiras onde canta o sabiá",
    ];
    for (const value in invalidValues) {
      expect(() => new MoneyVO(10, value)).toThrow();
    }
  });

  test("With not string currency code value", () => {
    const invalidValues = [
      false,
      undefined,
      null,
      true,
      ["test", 1, false, undefined],
      {},
    ];
    for (const value in invalidValues) {
      expect(() => new MoneyVO(10, value)).toThrow();
    }
  });

  test("With valid currency code and amount", () => {
    const validCombinations: [number, string][] = [
      [10, "BRL"],
      [200, "USD"],
      [500, "CAD"],
    ];

    validCombinations.forEach(([amount, currency]) => {
      expect(() => new MoneyVO(amount, currency)).not.toThrow();
      const moneyVO = new MoneyVO(amount, currency);
      expect(moneyVO).toHaveProperty("amount", amount);
      expect(moneyVO).toHaveProperty("currencyCode", currency);
    });
  });
});
