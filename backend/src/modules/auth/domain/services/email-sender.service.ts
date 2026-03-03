export interface EmailSenderService {
  sendAuthCode(email: string, code: string): Promise<void>;
}
