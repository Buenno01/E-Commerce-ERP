export interface CreateProductDTO {
  name: string;
  slug?: string;
  description?: string;
  price: {
    amount: number;
    currencyCode: string;
  };
  quantity?: number;
  sku?: string;
}