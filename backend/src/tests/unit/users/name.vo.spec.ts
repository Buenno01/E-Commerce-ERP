import { describe, expect, test } from "vitest";

import { NameVO } from "@/shared/domain/value-objects/name.vo";

describe("USERS:VALUE_OBJECT NameVO", () => {
  describe("With valid names", () => {
    test("Should create a valid name", () => {
      const name = new NameVO("Ana");
      expect(name.value).toBe("Ana");
    });

    test("Should trim strings", () => {
      const name = new NameVO("  Ana  ");
      expect(name.value).toBe("Ana");
    });

    test("Should preserve internal spaces (compound names)", () => {
      const name = new NameVO("João Pedro");
      expect(name.value).toBe("João Pedro");
    });

    test("Should accept names with accents and special characters", () => {
      const name = new NameVO("Ângela");
      expect(name.value).toBe("Ângela");
    });

    test("Should accept a name with exactly 3 characters", () => {
      const name = new NameVO("Ana");
      expect(name.value).toBe("Ana");
    });
  });

  describe("With invalid names", () => {
    test("Should throw if name is empty", () => {
      expect(() => new NameVO("")).toThrow("Name is required");
    });

    test("Should throw if name is null", () => {
      expect(() => new NameVO(null as unknown as string)).toThrow(
        "Name is required",
      );
    });

    test("Should throw if name is undefined", () => {
      expect(() => new NameVO(undefined as unknown as string)).toThrow(
        "Name is required",
      );
    });

    test("Should throw if name has only whitespace", () => {
      expect(() => new NameVO("     ")).toThrow("Name is required");
    });

    test("Should throw if name has 1 character", () => {
      expect(() => new NameVO("A")).toThrow(
        "Name must have at least 3 characters",
      );
    });

    test("Should throw if name has 2 characters", () => {
      expect(() => new NameVO("Ab")).toThrow(
        "Name must have at least 3 characters",
      );
    });

    test("Should throw if name has less than 3 characters after trim", () => {
      expect(() => new NameVO("  Ab  ")).toThrow(
        "Name must have at least 3 characters",
      );
    });
  });

  describe("value (getter)", () => {
    test("Should return the trimmed name", () => {
      const name = new NameVO("  Maria  ");
      expect(name.value).toBe("Maria");
    });
  });
});
