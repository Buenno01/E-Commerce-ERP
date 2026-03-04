import { NameVO } from "@/shared/domain/value-objects/name.vo";
import { SlugVO } from "@/shared/domain/value-objects/slug.vo";

interface ShopProps {
  id: string;
  ownerId: string;
  name: NameVO;
  slug: SlugVO;
  createdAt: Date;
  updatedAt: Date;
}

export class ShopEntity {
  private readonly _id: string;
  private _name: NameVO;
  private _slug: SlugVO;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _ownerId: string;

  private constructor(private props: ShopProps) {
    this._id = this.props.id;
    this._name = this.props.name;
    this._slug = this.props.slug;
    this._createdAt = this.props.createdAt;
    this._updatedAt = this.props.updatedAt;
    this._ownerId = this.props.ownerId;
  }

  static create(props: ShopProps): ShopEntity {
    return new ShopEntity(props);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get slug() {
    return this._slug;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get ownerId() {
    return this._ownerId;
  }
}
