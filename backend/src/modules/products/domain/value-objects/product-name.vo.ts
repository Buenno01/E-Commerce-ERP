export class ProductNameVO {
  constructor(public readonly value: string) {
    if (typeof value !== "string") {
      throw new Error("Product name must be a valid string");
    }
    if (value.length < 3 || value.length > 255) {
      throw new Error("Product name must be between 3 and 255 characters");
    }
  }
}
