import { describe, it, expect } from "vitest";

import { AuthCodeEntity } from "@auth/domain/entities/auth-code.entity";
import { AuthCodeVO } from "@auth/domain/value-objects/auth-code.vo";
import { EmailVO } from "@/shared/domain/value-objects/email.vo";

const makeAuthCode = () =>
  AuthCodeEntity.create({
    code: new AuthCodeVO(),
    email: new EmailVO("user@example.com"),
  });

describe("AUTH:ENTITY AuthCodeEntity", () => {
  describe("AuthCodeEntity.create()", () => {
    it("should create a valid auth code entity", () => {
      const authCode = makeAuthCode();
      expect(authCode).toBeInstanceOf(AuthCodeEntity);
    });
  });

  describe("code (getter)", () => {
    it("should return an AuthCodeVO instance", () => {
      const authCode = makeAuthCode();
      expect(authCode.code).toBeInstanceOf(AuthCodeVO);
    });

    it("should return the correct code value", () => {
      const code = new AuthCodeVO();
      const authCode = AuthCodeEntity.create({
        code,
        email: new EmailVO("user@example.com"),
      });

      expect(authCode.code.value).toBe(code.value);
    });
  });

  describe("email (getter)", () => {
    it("should return an EmailVO instance", () => {
      const authCode = makeAuthCode();
      expect(authCode.email).toBeInstanceOf(EmailVO);
    });

    it("should return the correct email value", () => {
      const email = new EmailVO("user@example.com");
      const authCode = AuthCodeEntity.create({
        code: new AuthCodeVO(),
        email,
      });

      expect(authCode.email.value).toBe("user@example.com");
    });
  });
});
