import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { EmailVO } from "../../../../shared/domain/value-objects/email.vo";
import { NameVO } from "../../../../shared/domain/value-objects/name.vo";
import { UserCreateDTO } from "../dtos/user-create.dto";

export class UserCreateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: UserCreateDTO): Promise<UserEntity> {
    const date = new Date();

    const userEntity = UserEntity.create({
      id: crypto.randomUUID(),
      email: new EmailVO(user.email),
      createdAt: date,
      updatedAt: date,
    });

    await this.userRepository.save(userEntity);

    return userEntity;
  }
}
