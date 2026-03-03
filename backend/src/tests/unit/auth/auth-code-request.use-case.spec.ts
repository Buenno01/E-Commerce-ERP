import { describe, it, expect, vi, beforeEach } from "vitest";

import { AuthCodeRequestUseCase } from "@auth/application/use-cases/auth-code-request.use-case";
import { AuthCodeRepository } from "@auth/domain/repositories/auth-code.repository";
import { AuthCodeEntity } from "@auth/domain/entities/auth-code.entity";

const makeRepositoryMock = (): AuthCodeRepository => ({
  save: vi.fn().mockResolvedValue(undefined),
  findByEmail: vi.fn().mockResolvedValue(null),
});

describe("AUTH:USE_CASE AuthCodeRequestUseCase", () => {
  let repository: AuthCodeRepository;
  let useCase: AuthCodeRequestUseCase;

  beforeEach(() => {
    repository = makeRepositoryMock();
    useCase = new AuthCodeRequestUseCase(repository);
  });

  describe("execute", () => {
    it("should save an auth code entity in the repository", async () => {
      await useCase.execute({ email: "user@example.com" });

      expect(repository.save).toHaveBeenCalledOnce();
      expect(repository.save).toHaveBeenCalledWith(expect.any(AuthCodeEntity));
    });

    it("should return a message confirming the code was sent", async () => {
      const result = await useCase.execute({ email: "user@example.com" });

      expect(result.message).toBe(
        `An authentication code was sent to "user@example.com".`,
      );
    });

    it("should include the provided email in the message", async () => {
      const result = await useCase.execute({ email: "another@example.com" });

      expect(result.message).toContain("another@example.com");
    });

    it("should throw if email is invalid", async () => {
      await expect(useCase.execute({ email: "invalid-email" })).rejects.toThrow(
        "Invalid email",
      );
    });

    it("should not save if email is invalid", async () => {
      await expect(
        useCase.execute({ email: "invalid-email" }),
      ).rejects.toThrow();

      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
