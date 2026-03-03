import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { AuthCodeEntity } from "../../domain/entities/auth-code.entity";
import { AuthCodeRepository } from "../../domain/repositories/auth-code.repository";
import { AuthCodeVO } from "../../domain/value-objects/auth-code.vo";
import { AuthCodeRequestDTO } from "../dtos/auth-code-request.dto";
import { EmailSenderService } from "../../domain/services/email-sender.service";

export class AuthCodeRequestUseCase {
  constructor(
    private readonly authCodeRepository: AuthCodeRepository,
    private readonly emailSender: EmailSenderService,
  ) {}

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

    await this.emailSender.sendAuthCode(email, authCodeEntity.code.value);

    return {
      message: `An authentication code was sent to "${email}".`,
    };
  }
}
