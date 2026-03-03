import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { AuthCodeVO } from "../value-objects/auth-code.vo";

interface AuthCodeProps {
  code: AuthCodeVO;
  email: EmailVO;
  createdAt: Date;
}

export class AuthCodeEntity {
  private readonly _code;
  private readonly _email;
  private readonly _createdAt;

  constructor(props: AuthCodeProps) {
    this._code = props.code;
    this._email = props.email;
    this._createdAt = props.createdAt;
  }

  static create(props: AuthCodeProps) {
    return new AuthCodeEntity(props);
  }

  get code() {
    return this._code;
  }
  get email() {
    return this._email;
  }
  get createdAt() {
    return this._createdAt;
  }
}
