import { SkuVO } from "@/modules/products/domain/value-objects/sku.vo";
import { describe, expect, test } from "vitest";

describe("PRODUCTS:VALUE_OBJECT SkuVO", () => {
  test("With invalid strings", () => {
    const invalidValues = [
      "",
      "Forest | Snowboard",
      '24" LCD Monitor',
      "#&%#&!@*(#(()!@$",
    ];

    invalidValues.forEach((name) => {
      expect(() => new SkuVO(name)).toThrow();
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
      expect(() => new SkuVO(thing)).toThrow();
    });
  });

  test("With valid strings", () => {
    const validValues = [
      "test",
      "Candy",
      "AB12345678",
      "1",
      "123456",
      "IN-1234155123",
    ];

    validValues.forEach((value) => {
      expect(() => new SkuVO(value)).not.toThrow();
      const skuVO = new SkuVO(value);
      expect(skuVO.value).toBe(value);
    });
  });
});
