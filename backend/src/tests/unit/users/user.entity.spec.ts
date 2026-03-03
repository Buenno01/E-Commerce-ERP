import { describe, expect, test } from "vitest";

import { ProductEntity } from "@users/domain/entities/user.entity";
import { NameVO } from "@/modules/users/domain/value-objects/name.vo";
import { EmailVO } from "@/modules/users/domain/value-objects/email.vo";

const makeUser = (overrides = {}) =>
  ProductEntity.create({
    id: "123e4567-e89b-12d3-a456-426614174000",
    firstName: new NameVO("John"),
    lastName: new NameVO("Doe"),
    email: new EmailVO("john.doe@example.com"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    ...overrides,
  });

describe("USERS:ENTITY UserEntity", () => {
  describe("ProductEntity.create()", () => {
    test("Should create a valid user", () => {
      const user = makeUser();
      expect(user).toBeInstanceOf(ProductEntity);
    });

    test("Should throw if firstName is invalid", () => {
      expect(() => makeUser({ firstName: new NameVO("Ab") })).toThrow(
        "Name must have at least 3 characters",
      );
    });

    test("Should throw if lastName is invalid", () => {
      expect(() => makeUser({ lastName: new NameVO("Ab") })).toThrow(
        "Name must have at least 3 characters",
      );
    });

    test("Should throw if email is invalid", () => {
      expect(() => makeUser({ email: new EmailVO("invalid-email") })).toThrow(
        "Invalid email",
      );
    });
  });

  describe("id (getter)", () => {
    test("Should return the correct id", () => {
      const user = makeUser();
      expect(user.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
  });

  describe("firstName (getter)", () => {
    test("Should return a NameVO instance", () => {
      const user = makeUser();
      expect(user.firstName.value).toBe("John");
    });
  });

  describe("lastName (getter)", () => {
    test("Should return a NameVO instance", () => {
      const user = makeUser();
      expect(user.lastName.value).toBe("Doe");
    });
  });

  describe("name (getter)", () => {
    test("Should return the full name", () => {
      const user = makeUser({
        firstName: new NameVO("Xablau"),
        lastName: new NameVO("Dos Santos"),
      });
      expect(user.name).toBe("Xablau Dos Santos");
    });
  });

  describe("email (getter)", () => {
    test("Should return an EmailVO instance", () => {
      const user = makeUser();
      expect(user.email.value).toBe("john.doe@example.com");
    });
  });

  describe("createdAt (getter)", () => {
    test("Should return the correct createdAt date", () => {
      const createdAt = new Date("2024-01-01");
      const user = makeUser({ createdAt });
      expect(user.createdAt).toEqual(createdAt);
    });
  });

  describe("updatedAt (getter)", () => {
    test("Should return the correct updatedAt date", () => {
      const updatedAt = new Date("2024-06-01");
      const user = makeUser({ updatedAt });
      expect(user.updatedAt).toEqual(updatedAt);
    });
  });
});
