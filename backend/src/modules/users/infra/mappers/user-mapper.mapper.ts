import { user as PrismaUser } from "@prisma-generated/client";
import { UserEntity } from "@users/domain/entities/user.entity";
import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { NameVO } from "@/shared/domain/value-objects/name.vo";

export class UserMapper {
  static toDomain(raw: PrismaUser): UserEntity {
    return UserEntity.create({
      id: raw.id,
      email: new EmailVO(raw.email),
      firstName: raw.firstName ? new NameVO(raw.firstName) : undefined,
      lastName: raw.lastName ? new NameVO(raw.lastName) : undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(
    user: UserEntity,
  ): Omit<PrismaUser, "createdAt" | "updatedAt"> {
    return {
      id: user.id,
      email: user.email.value,
      firstName: user.firstName?.value ?? null,
      lastName: user.lastName?.value ?? null,
    };
  }
}
