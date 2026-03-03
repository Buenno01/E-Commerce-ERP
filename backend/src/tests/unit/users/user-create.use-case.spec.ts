import { describe, it, expect, vi, beforeEach } from "vitest";

import { UserCreateUseCase } from "@users/application/use-cases/user-create.use-case";
import { UserRepository } from "@users/domain/repositories/user.repository";
import { UserEntity } from "@users/domain/entities/user.entity";
import { UserCreateDTO } from "@users/application/dtos/user-create.dto";

const makeRepositoryMock = (): UserRepository => ({
  save: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  findById: vi.fn().mockResolvedValue(null),
  findByEmail: vi.fn().mockResolvedValue(null),
});

const makeDTO = (overrides?: Partial<UserCreateDTO>): UserCreateDTO => ({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  ...overrides,
});

describe("UserCreateUseCase", () => {
  let repository: UserRepository;
  let useCase: UserCreateUseCase;

  beforeEach(() => {
    repository = makeRepositoryMock();
    useCase = new UserCreateUseCase(repository);
  });

  describe("execute", () => {
    it("should create and return a user entity", async () => {
      const result = await useCase.execute(makeDTO());

      expect(result).toBeInstanceOf(UserEntity);
    });

    it("should save the user in the repository", async () => {
      await useCase.execute(makeDTO());

      expect(repository.save).toHaveBeenCalledOnce();
      expect(repository.save).toHaveBeenCalledWith(expect.any(UserEntity));
    });

    it("should set firstName correctly", async () => {
      const result = await useCase.execute(makeDTO({ firstName: "Jane" }));

      expect(result.firstName.value).toBe("Jane");
    });

    it("should set lastName correctly", async () => {
      const result = await useCase.execute(makeDTO({ lastName: "Smith" }));

      expect(result.lastName.value).toBe("Smith");
    });

    it("should set email correctly", async () => {
      const result = await useCase.execute(
        makeDTO({ email: "jane.smith@example.com" }),
      );

      expect(result.email.value).toBe("jane.smith@example.com");
    });

    it("should generate a unique id for each user", async () => {
      const first = await useCase.execute(makeDTO());
      const second = await useCase.execute(makeDTO());

      expect(first.id).not.toBe(second.id);
    });

    it("should set createdAt and updatedAt to the same date on creation", async () => {
      const result = await useCase.execute(makeDTO());

      expect(result.createdAt).toEqual(result.updatedAt);
    });

    it("should throw if firstName is invalid", async () => {
      await expect(
        useCase.execute(makeDTO({ firstName: "Ab" })),
      ).rejects.toThrow("Name must have at least 3 characters");
    });

    it("should throw if lastName is invalid", async () => {
      await expect(
        useCase.execute(makeDTO({ lastName: "Ab" })),
      ).rejects.toThrow("Name must have at least 3 characters");
    });

    it("should throw if email is invalid", async () => {
      await expect(
        useCase.execute(makeDTO({ email: "invalid-email" })),
      ).rejects.toThrow("Invalid email");
    });

    it("should not save if the entity creation fails", async () => {
      await expect(
        useCase.execute(makeDTO({ email: "invalid-email" })),
      ).rejects.toThrow();

      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
