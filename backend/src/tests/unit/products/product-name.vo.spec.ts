import { ProductNameVO } from "@/modules/products/domain/value-objects/product-name.vo";
import { describe, expect, test } from "vitest";

describe("PRODUCTS:VALUE_OBJECT ProductNameVO", () => {
  test("With less than 3 chars length string", () => {
    const invalidValues = ["a", "ab", ""];

    invalidValues.forEach((name) => {
      expect(() => new ProductNameVO(name)).toThrow();
    });
  });

  test("With not string params", () => {
    const invalidValues = [
      ["test", 1, false],
      {},
      undefined,
      null,
      true,
      false,
    ];

    invalidValues.forEach((thing) => {
      // @ts-expect-error
      expect(() => new ProductNameVO(thing)).toThrow();
    });
  });

  test("With valid strings", () => {
    const validValues = [
      "test",
      "Candy",
      "Forest | Snowboard",
      '24" LCD Monitor',
      "Hamlet - Shakespeare",
    ];

    validValues.forEach((value) => {
      expect(() => new ProductNameVO(value)).not.toThrow();
      const productNameVO = new ProductNameVO(value);
      expect(productNameVO.value).toBe(value);
    });
  });
});
