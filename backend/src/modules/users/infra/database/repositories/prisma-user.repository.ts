import { PrismaClient } from "@prisma-generated/client";
import { UserEntity } from "@users/domain/entities/user.entity";
import { UserRepository } from "@users/domain/repositories/user.repository";
import { UserMapper } from "@users/infra/mappers/user-mapper.mapper";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async update(user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPersistence(user),
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return UserMapper.toDomain(raw);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!raw) return null;

    return UserMapper.toDomain(raw);
  }
}
