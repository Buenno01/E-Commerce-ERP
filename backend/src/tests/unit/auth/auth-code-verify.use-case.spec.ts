import { describe, it, expect, vi, beforeEach } from "vitest";

import { AuthCodeVerifyUseCase } from "@auth/application/use-cases/auth-code-verify.use-case";
import { AuthCodeRepository } from "@auth/domain/repositories/auth-code.repository";
import { UserRepository } from "@users/domain/repositories/user.repository";
import { AuthCodeEntity } from "@auth/domain/entities/auth-code.entity";
import { AuthCodeVO } from "@auth/domain/value-objects/auth-code.vo";
import { UserEntity } from "@users/domain/entities/user.entity";
import { EmailVO } from "@/shared/domain/value-objects/email.vo";

const VALID_CODE = "123456";
const VALID_EMAIL = "user@example.com";

const makeAuthCodeEntity = (overrides?: {
  code?: string;
  createdAt?: Date;
}): AuthCodeEntity => {
  const codeVO = { value: overrides?.code ?? VALID_CODE } as AuthCodeVO;

  return {
    code: codeVO,
    email: new EmailVO(VALID_EMAIL),
    createdAt: overrides?.createdAt ?? new Date(),
  } as unknown as AuthCodeEntity;
};

const makeUserEntity = (): UserEntity =>
  UserEntity.create({
    id: "user-id-123",
    email: new EmailVO(VALID_EMAIL),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const makeAuthCodeRepositoryMock = (): AuthCodeRepository => ({
  save: vi.fn().mockResolvedValue(undefined),
  findByEmail: vi.fn().mockResolvedValue(makeAuthCodeEntity()),
  deleteByEmail: vi.fn().mockResolvedValue(undefined),
});

const makeUserRepositoryMock = (): UserRepository => ({
  save: vi.fn().mockResolvedValue(undefined),
  findByEmail: vi.fn().mockResolvedValue(null),
  findById: vi.fn().mockResolvedValue(null),
  delete: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
});

const decodeToken = (token: string) =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

describe("AUTH:USE_CASE AuthCodeVerifyUseCase", () => {
  let authCodeRepository: AuthCodeRepository;
  let userRepository: UserRepository;
  let useCase: AuthCodeVerifyUseCase;

  beforeEach(() => {
    vi.stubEnv("JWT_SECRET", "test-secret");
    authCodeRepository = makeAuthCodeRepositoryMock();
    userRepository = makeUserRepositoryMock();
    useCase = new AuthCodeVerifyUseCase(authCodeRepository, userRepository);
  });

  describe("code validation", () => {
    it("should throw if no auth code is found for the email", async () => {
      vi.mocked(authCodeRepository.findByEmail).mockResolvedValueOnce(null);

      await expect(
        useCase.execute({ email: VALID_EMAIL, code: VALID_CODE }),
      ).rejects.toThrow("This code is not valid or has expired.");
    });

    it("should throw if the code does not match", async () => {
      await expect(
        useCase.execute({ email: VALID_EMAIL, code: "000000" }),
      ).rejects.toThrow("This code is not valid or has expired.");
    });

    it("should throw if the auth code is expired", async () => {
      const expiredDate = new Date(Date.now() - 6 * 60 * 1000); // 6 minutes ago
      vi.mocked(authCodeRepository.findByEmail).mockResolvedValueOnce(
        makeAuthCodeEntity({ createdAt: expiredDate }),
      );

      await expect(
        useCase.execute({ email: VALID_EMAIL, code: VALID_CODE }),
      ).rejects.toThrow("This code is not valid or has expired.");
    });

    it("should delete the auth code when expired", async () => {
      const expiredDate = new Date(Date.now() - 6 * 60 * 1000);
      vi.mocked(authCodeRepository.findByEmail).mockResolvedValueOnce(
        makeAuthCodeEntity({ createdAt: expiredDate }),
      );

      await expect(
        useCase.execute({ email: VALID_EMAIL, code: VALID_CODE }),
      ).rejects.toThrow();

      expect(authCodeRepository.deleteByEmail).toHaveBeenCalledWith(
        VALID_EMAIL,
      );
    });

    it("should not delete the auth code when code is invalid", async () => {
      await expect(
        useCase.execute({ email: VALID_EMAIL, code: "000000" }),
      ).rejects.toThrow();

      expect(authCodeRepository.deleteByEmail).not.toHaveBeenCalled();
    });

    it("should delete the auth code after successful verification", async () => {
      await useCase.execute({ email: VALID_EMAIL, code: VALID_CODE });

      expect(authCodeRepository.deleteByEmail).toHaveBeenCalledWith(
        VALID_EMAIL,
      );
    });
  });

  describe("user creation", () => {
    it("should create a new user if one does not exist", async () => {
      await useCase.execute({ email: VALID_EMAIL, code: VALID_CODE });

      expect(userRepository.save).toHaveBeenCalledOnce();
      expect(userRepository.save).toHaveBeenCalledWith(expect.any(UserEntity));
    });

    it("should not create a new user if one already exists", async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(
        makeUserEntity(),
      );

      await useCase.execute({ email: VALID_EMAIL, code: VALID_CODE });

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("token", () => {
    it("should return a token on success", async () => {
      const result = await useCase.execute({
        email: VALID_EMAIL,
        code: VALID_CODE,
      });

      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe("string");
    });

    it("should include the email in the token payload", async () => {
      const result = await useCase.execute({
        email: VALID_EMAIL,
        code: VALID_CODE,
      });

      expect(decodeToken(result.token).email).toBe(VALID_EMAIL);
    });

    it("should include the user id as sub in the token payload", async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(
        makeUserEntity(),
      );

      const result = await useCase.execute({
        email: VALID_EMAIL,
        code: VALID_CODE,
      });

      expect(decodeToken(result.token).sub).toBe("user-id-123");
    });

    it("should use the existing user id when user already exists", async () => {
      const existingUser = makeUserEntity();
      vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(existingUser);

      const result = await useCase.execute({
        email: VALID_EMAIL,
        code: VALID_CODE,
      });

      expect(decodeToken(result.token).sub).toBe(existingUser.id);
    });
  });
});
