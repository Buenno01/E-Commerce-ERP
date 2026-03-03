import { AuthCodeEntity } from "../entities/auth-code.entity";

export interface AuthCodeRepository {
  save(authCode: AuthCodeEntity): Promise<void>;
  findByCode(code: string): Promise<void>;
}
