import { SlugVO } from "@products/domain/value-objects/slug.vo";
import { describe, expect, test } from "vitest";

describe("PRODUCTS:VALUE_OBJECT SlugVO", () => {
  describe("constructor", () => {
    test("With less than 3 char string", () => {
      const invalidValues = ["1", "12"];

      invalidValues.forEach((name) => {
        expect(() => new SlugVO(name)).toThrow();
      });
    });

    test("With over 255 char string", () => {
      const invalidValue = "".padStart(256, "a");

      expect(() => new SlugVO(invalidValue)).toThrow();
    });

    test("With invalid strings", () => {
      const invalidValues = [
        "Forest | Snowboard",
        '24" LCD Monitor',
        "#&%#&!@*(#(()!@$",
        "Blank space test",
        "hyphen-at-the-end-of-string-",
        "-hyphen-at-the-start-of-string",
        "WITH-UPPERCASE-STRING",
      ];

      invalidValues.forEach((name) => {
        expect(() => new SlugVO(name)).toThrow();
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
        expect(() => new SlugVO(thing)).toThrow();
      });
    });

    test("With valid strings", () => {
      const validValues = [
        "test",
        "c-a-n-d-y",
        "ab12345678",
        "123456",
        "in-1234155123",
      ];

      validValues.forEach((value) => {
        expect(() => new SlugVO(value)).not.toThrow();
        const slugVO = new SlugVO(value);
        expect(slugVO.value).toBe(value);
      });
    });
  });

  describe("fromString", () => {
    test("Should correctly create a slug from a valid string", () => {
      expect(SlugVO.fromString("Forest | Snowboard").value).toBe(
        "forest-snowboard",
      );
      expect(SlugVO.fromString('24" LCD Monitor').value).toBe("24-lcd-monitor");
      expect(SlugVO.fromString("With Special Chars!&#").value).toBe(
        "with-special-chars",
      );
      expect(SlugVO.fromString("Figure #1").value).toBe("figure-1");
      expect(SlugVO.fromString("Motherboard - AMD - DDR4 | B560").value).toBe(
        "motherboard-amd-ddr4-b560",
      );
    });
  });
});
