export class SkuVO {
  constructor(public readonly value: string) {
    if (typeof value !== "string") {
      throw new Error("SKU must be a valid string");
    }
    if (!value.match(/^[a-zA-Z0-9-]+$/)) {
      throw new Error("SKU must contain only letters, numbers and hyphen");
    }
  }
}
