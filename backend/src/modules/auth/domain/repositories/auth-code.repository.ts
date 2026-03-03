import { AuthCodeEntity } from "../entities/auth-code.entity";

export interface AuthCodeRepository {
  save(authCode: AuthCodeEntity): Promise<void>;
  findByEmail(email: string): Promise<AuthCodeEntity | null>;
  deleteByEmail(email: string): Promise<void>;
}
