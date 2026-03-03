import { EmailVO } from "../../../../shared/domain/value-objects/email.vo";
import { NameVO } from "../../../../shared/domain/value-objects/name.vo";

interface UserProps {
  id: string;
  firstName?: NameVO;
  lastName?: NameVO;
  email: EmailVO;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  private readonly _id: string;
  private _firstName?: NameVO;
  private _lastName?: NameVO;
  private _email: EmailVO;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(private props: UserProps) {
    this._id = this.props.id;
    this._firstName = this.props.firstName;
    this._lastName = this.props.lastName;
    this._email = this.props.email;
    this._createdAt = this.props.createdAt;
    this._updatedAt = this.props.updatedAt;
  }

  static create(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  get id() {
    return this._id;
  }
  get name() {
    const merged = (this._firstName + " " + this._lastName).trim();
    if ((!this._firstName && !this._lastName) || !merged) return undefined;
    return merged;
  }
  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get email() {
    return this._email;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
