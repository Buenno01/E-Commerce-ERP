import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { AuthCodeEntity } from "../../domain/entities/auth-code.entity";
import { AuthCodeRepository } from "../../domain/repositories/auth-code.repository";
import { AuthCodeVO } from "../../domain/value-objects/auth-code.vo";
import { AuthCodeRequestDTO } from "../dtos/auth-code-request.dto";

export class AuthCodeRequestUseCase {
  constructor(private readonly authCodeRepository: AuthCodeRepository) {}

  async execute(props: AuthCodeRequestDTO): Promise<{ message: string }> {
    const authCodeEntity = new AuthCodeEntity({
      email: new EmailVO(props.email),
      code: new AuthCodeVO(),
    });

    await this.authCodeRepository.save(authCodeEntity);

    return {
      message: `An authentication code was sent to "${props.email}".`,
    };
  }
}
