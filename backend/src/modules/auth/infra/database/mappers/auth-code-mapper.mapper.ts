import { authCode as PrismaAuthCode } from "@prisma-generated/client";
import { AuthCodeEntity } from "@auth/domain/entities/auth-code.entity";
import { AuthCodeVO } from "@auth/domain/value-objects/auth-code.vo";
import { EmailVO } from "@/shared/domain/value-objects/email.vo";

export class AuthCodeMapper {
  static toDomain(raw: PrismaAuthCode): AuthCodeEntity {
    return AuthCodeEntity.create({
      code: AuthCodeVO.restore(raw.code),
      email: new EmailVO(raw.email),
      createdAt: raw.createdAt,
    });
  }

  static toPersistence(
    authCode: AuthCodeEntity,
  ): Omit<PrismaAuthCode, "createdAt"> {
    return {
      code: authCode.code.value,
      email: authCode.email.value,
    };
  }
}
