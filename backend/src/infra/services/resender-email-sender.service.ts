// TODO: Implement the resender SDK to send e-mails

import { EmailSenderService } from "@/modules/auth/domain/services/email-sender.service";

export class ResenderEmailSenderService implements EmailSenderService {
  constructor() {}

  async sendAuthCode(email: string, code: string): Promise<void> {
    console.warn(
      `Email sender not implemented. Should email ${email} with the auth code`,
    );
    return;
  }
}
