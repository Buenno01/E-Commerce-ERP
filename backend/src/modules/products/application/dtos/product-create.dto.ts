export interface CreateProductDTO {
  name: string;
  slug?: string;
  description?: string;
  price: {
    amount: number;
    currency: string;
  };
  quantity?: number;
  sku?: string;
}