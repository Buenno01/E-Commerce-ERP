import { EmailVO } from "@/shared/domain/value-objects/email.vo";
import { AuthCodeVO } from "../value-objects/auth-code.vo";

interface AuthCodeProps {
  code: AuthCodeVO;
  email: EmailVO;
}

export class AuthCodeEntity {
  private readonly _code;
  private readonly _email;

  constructor(props: AuthCodeProps) {
    this._code = props.code;
    this._email = props.email;
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
}
