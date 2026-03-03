import { describe, expect, test } from "vitest";

import { AuthCodeVO } from "@auth/domain/value-objects/auth-code.vo";

describe("AUTH:VALUE_OBJECT AuthCodeVO", () => {
  describe("constructor", () => {
    test("should generate a code on instantiation", () => {
      const authCode = new AuthCodeVO();
      expect(authCode.value).toBeDefined();
    });

    test("should generate a code with exactly 6 characters", () => {
      const authCode = new AuthCodeVO();
      expect(authCode.value).toHaveLength(6);
    });

    test("should generate a code with only numeric characters", () => {
      const authCode = new AuthCodeVO();
      expect(authCode.value).toMatch(/^\d{6}$/);
    });

    test("should generate different codes on each instantiation", () => {
      const codes = new Set(
        Array.from({ length: 20 }, () => new AuthCodeVO().value),
      );
      expect(codes.size).toBeGreaterThan(1);
    });
  });

  describe("value (getter)", () => {
    test("should return the generated code as a string", () => {
      const authCode = new AuthCodeVO();
      expect(typeof authCode.value).toBe("string");
    });
  });
});
