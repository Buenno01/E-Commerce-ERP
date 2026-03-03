import { AuthCodeRepository } from "../../domain/repositories/auth-code.repository";
import { AuthCodeVerifyDTO } from "../dtos/auth-code-verify.dto";

const FIVE_MINUTES = 300000;

export class AuthCodeRequestUseCase {
  constructor(private readonly authCodeRepository: AuthCodeRepository) {}

  async execute(props: AuthCodeVerifyDTO): Promise<{ token: string }> {
    const authCodeEntity = await this.authCodeRepository.findByEmail(
      props.email,
    );

    const now = new Date();

    if (
      authCodeEntity.code.value !== props.code ||
      now.getTime() - authCodeEntity.createdAt.getTime() > FIVE_MINUTES
    ) {
      throw new Error("This code is not valid or has expired.");
    }

    // TODO: Create user if they don't exist

    // TODO: generate token with user id and email

    return {
      token: Buffer.from("Not implemented!").toString("base64"),
    };
  }
}
