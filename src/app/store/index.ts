import { User } from "../model/auth.model";
import { Product } from "../model/product.model";

export type AppState = {
  user: { currentUser: User; token: string; authError: string };
  product: { products: Product[], product: Product, productError: string }
};
