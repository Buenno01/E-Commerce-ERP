import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { AuthCodeEntity } from "../../domain/entities/auth-code.entity";
import { AuthCodeRepository } from "../../domain/repositories/auth-code.repository";
import { AuthCodeVO } from "../../domain/value-objects/auth-code.vo";
import { AuthCodeRequestDTO } from "../dtos/auth-code-request.dto";

export class AuthCodeRequestUseCase {
  constructor(private readonly authCodeRepository: AuthCodeRepository) {}

  async execute({ email }: AuthCodeRequestDTO): Promise<{ message: string }> {
    const alreadyExistingCode =
      await this.authCodeRepository.findByEmail(email);

    if (alreadyExistingCode) {
      await this.authCodeRepository.deleteByEmail(email);
    }

    const authCodeEntity = new AuthCodeEntity({
      email: new EmailVO(email),
      code: new AuthCodeVO(),
      createdAt: new Date(),
    });

    await this.authCodeRepository.save(authCodeEntity);

    return {
      message: `An authentication code was sent to "${email}".`,
    };
  }
}
