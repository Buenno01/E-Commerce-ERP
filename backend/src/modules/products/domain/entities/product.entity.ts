import { MoneyVO } from "../value-objects/money.vo";
import { ProductNameVO } from "../value-objects/product-name.vo";
import { SkuVO } from "../value-objects/sku.vo";
import { SlugVO } from "../value-objects/slug.vo";

interface ProductProps {
  id: string;
  name: ProductNameVO;
  slug: SlugVO;
  description: string | null;
  price: MoneyVO;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  sku: SkuVO;
}

export class ProductEntity {
  private readonly _id: string;
  private _name: ProductNameVO;
  private _slug: SlugVO;
  private _description: string | null;
  private _price: MoneyVO;
  private _quantity: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _sku: SkuVO;

  private constructor(private props: ProductProps) {
    this._id = this.props.id;
    this._name = this.props.name;
    this._slug = this.props.slug;
    this._description = this.props.description;
    this._price = this.props.price;
    this._quantity = this.props.quantity;
    this._createdAt = this.props.createdAt;
    this._updatedAt = this.props.updatedAt;
    this._sku = this.props.sku;
  }

  static create(props: ProductProps): ProductEntity {
    return new ProductEntity(props);
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
  get price() {
    return this._price;
  }
  get sku() {
    return this._sku;
  }
  get description() {
    return this._description;
  }
  get quantity() {
    return this._quantity;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
