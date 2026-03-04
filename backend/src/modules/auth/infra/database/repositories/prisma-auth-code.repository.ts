import { PrismaClient } from "@prisma-generated/client";
import { AuthCodeEntity } from "@auth/domain/entities/auth-code.entity";
import { AuthCodeRepository } from "@auth/domain/repositories/auth-code.repository";
import { AuthCodeMapper } from "../../mappers/auth-code-mapper.mapper";

export class PrismaAuthCodeRepository implements AuthCodeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(authCode: AuthCodeEntity): Promise<void> {
    await this.prisma.authCode.create({
      data: AuthCodeMapper.toPersistence(authCode),
    });
  }

  async findByEmail(email: string): Promise<AuthCodeEntity | null> {
    const raw = await this.prisma.authCode.findUnique({
      where: { email },
    });

    if (!raw) return null;

    return AuthCodeMapper.toDomain(raw);
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.prisma.authCode.delete({
      where: { email },
    });
  }
}
