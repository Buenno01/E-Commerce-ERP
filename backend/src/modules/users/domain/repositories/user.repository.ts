import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
  update(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
