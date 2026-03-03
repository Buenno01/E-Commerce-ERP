import { describe, expect, test } from "vitest";

import { AuthCodeVO } from "@auth/domain/value-objects/auth-code.vo";

describe("AUTH:VALUE_OBJECT AuthCodeVO", () => {
  describe("constructor", () => {
    test("should generate a code on instantiation", () => {
      const authCode = AuthCodeVO.generate();
      expect(authCode.value).toBeDefined();
    });

    test("should generate a code with exactly 6 characters", () => {
      const authCode = AuthCodeVO.generate();
      expect(authCode.value).toHaveLength(6);
    });

    test("should generate a code with only numeric characters", () => {
      const authCode = AuthCodeVO.generate();
      expect(authCode.value).toMatch(/^\d{6}$/);
    });

    test("should generate different codes on each instantiation", () => {
      const codes = new Set(
        Array.from({ length: 20 }, () => AuthCodeVO.generate().value),
      );
      expect(codes.size).toBeGreaterThan(1);
    });
  });

  describe("value (getter)", () => {
    test("should return the generated code as a string", () => {
      const authCode = AuthCodeVO.generate();
      expect(typeof authCode.value).toBe("string");
    });
  });
});
