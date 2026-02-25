import { ConnectionType } from "@/infra/graphql/schema/connection.type";
import { ProductType } from "./product.type";

export const ProductConnection = ConnectionType(ProductType);
