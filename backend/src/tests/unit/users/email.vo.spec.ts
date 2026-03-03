import { describe, expect, test } from "vitest";

import { EmailVO } from "@users/domain/value-objects/email.vo";

describe("USERS:VALUE_OBJECT EmailVO", () => {
  describe("With valid emails", () => {
    test("Should create a valid email", () => {
      const email = new EmailVO("example@example.com");
      expect(email.value).toBe("example@example.com");
    });

    test("Should normalize to lowercase", () => {
      const email = new EmailVO("USER@EXAMPLE.COM");
      expect(email.value).toBe("user@example.com");
    });

    test("Should trim strings", () => {
      const email = new EmailVO("  user@example.com  ");
      expect(email.value).toBe("user@example.com");
    });

    test("Should accept subdomains", () => {
      const email = new EmailVO("user@mail.example.com");
      expect(email.value).toBe("user@mail.example.com");
    });

    test("Should accept long TLDs", () => {
      const email = new EmailVO("user@example.technology");
      expect(email.value).toBe("user@example.technology");
    });

    test("Should accept valid special chars", () => {
      const email = new EmailVO("user.name+tag@example.com");
      expect(email.value).toBe("user.name+tag@example.com");
    });

    test("Should accept numbers", () => {
      const email = new EmailVO("user123@example123.com");
      expect(email.value).toBe("user123@example123.com");
    });
  });

  describe("With invalid emails", () => {
    test("Should throw if email is empty", () => {
      expect(() => new EmailVO("")).toThrow("Email is required");
    });

    test("Should throw if email is undefined", () => {
      expect(() => new EmailVO(undefined as unknown as string)).toThrow(
        "Email is required",
      );
    });

    test("Should throw if email is null", () => {
      expect(() => new EmailVO(null as unknown as string)).toThrow(
        "Email is required",
      );
    });

    test('Should throw if email has no "@"', () => {
      expect(() => new EmailVO("userexample.com")).toThrow("Invalid email");
    });

    test('Should throw if email has no domain after "@"', () => {
      expect(() => new EmailVO("user@")).toThrow("Invalid email");
    });

    test('Should throw if email has no string before "@"', () => {
      expect(() => new EmailVO("@example.com")).toThrow("Invalid email");
    });

    test("Should throw if email has no TLD", () => {
      expect(() => new EmailVO("user@example")).toThrow("Invalid email");
    });

    test("Should throw if email has blank spaces in the middle", () => {
      expect(() => new EmailVO("user @example.com")).toThrow("Invalid email");
    });

    test('Should throw if email has multiple "@"', () => {
      expect(() => new EmailVO("user@@example.com")).toThrow("Invalid email");
    });
  });

  describe("value (getter)", () => {
    test("Should return normalized email", () => {
      const email = new EmailVO("Test@Example.COM");
      expect(email.value).toBe("test@example.com");
    });

    test("Should be readonly", () => {
      const email = new EmailVO("example@example.com");
      expect(() => {
        (email as any)._value = "hacked@hacker.com";
      }).not.toThrow();
      expect(email.value).toBe("example@example.com");
    });
  });

  describe("EmailVO.isValid()", () => {
    test("Should return true if the email is valid", () => {
      expect(EmailVO.isValid("user@example.com")).toBe(true);
    });

    test('Should return false if the email has no "@"', () => {
      expect(EmailVO.isValid("userexample.com")).toBe(false);
    });

    test("Should return false if it is an empty string", () => {
      expect(EmailVO.isValid("")).toBe(false);
    });

    test("Should return false if the email has no TLD", () => {
      expect(EmailVO.isValid("user@example")).toBe(false);
    });
  });

  describe("equals()", () => {
    test("Should return true for identical emails", () => {
      const a = new EmailVO("user@example.com");
      const b = new EmailVO("user@example.com");
      expect(a.equals(b)).toBe(true);
    });

    test("Should return true as case insensitive (after normalization)", () => {
      const a = new EmailVO("USER@EXAMPLE.COM");
      const b = new EmailVO("user@example.com");
      expect(a.equals(b)).toBe(true);
    });

    test("Should return false for different emails", () => {
      const a = new EmailVO("user@example.com");
      const b = new EmailVO("other@example.com");
      expect(a.equals(b)).toBe(false);
    });

    test("Should return false for different domains", () => {
      const a = new EmailVO("user@example.com");
      const b = new EmailVO("user@other.com");
      expect(a.equals(b)).toBe(false);
    });
  });
});
