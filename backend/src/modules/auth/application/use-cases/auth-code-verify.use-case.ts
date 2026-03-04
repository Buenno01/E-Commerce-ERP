import jwt from "jsonwebtoken";

import { UserRepository } from "@/modules/users/domain/repositories/user.repository";
import { AuthCodeRepository } from "../../domain/repositories/auth-code.repository";
import { AuthCodeVerifyDTO } from "../dtos/auth-code-verify.dto";
import { UserEntity } from "@/modules/users/domain/entities/user.entity";
import { EmailVO } from "@/shared/domain/value-objects/email.vo";

const FIVE_MINUTES = 5 * 60 * 1000;

export class AuthCodeVerifyUseCase {
  constructor(
    private readonly authCodeRepository: AuthCodeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    email,
    code,
  }: AuthCodeVerifyDTO): Promise<{ token: string }> {
    if (!EmailVO.isValid(email)) {
      throw new Error("Invalid email");
    }

    const authCodeEntity = await this.authCodeRepository.findByEmail(email);

    if (!authCodeEntity) {
      throw new Error("This code is not valid or has expired.");
    }

    const now = new Date();

    if (authCodeEntity.code.value !== code) {
      throw new Error("This code is not valid or has expired.");
    }

    if (now.getTime() - authCodeEntity.createdAt.getTime() > FIVE_MINUTES) {
      await this.authCodeRepository.deleteByEmail(email);
      throw new Error("This code is not valid or has expired.");
    }

    await this.authCodeRepository.deleteByEmail(email);

    const existingUser = await this.userRepository.findByEmail(email);

    let userEntity = existingUser as UserEntity;

    if (!existingUser) {
      userEntity = UserEntity.create({
        email: new EmailVO(email),
        createdAt: new Date(),
        updatedAt: new Date(),
        id: crypto.randomUUID(),
      });

      await this.userRepository.save(userEntity);
    }

    const token = jwt.sign(
      { sub: userEntity.id, email: new EmailVO(email).value },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return {
      token,
    };
  }
}
