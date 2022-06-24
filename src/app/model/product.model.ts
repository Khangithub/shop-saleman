import { User } from "./user.model";

export interface Product {
  category: string;
  createAt: string;
  description: string;
  discount: number;
  fields: string[];
  inStock: number;
  manufacturer: string;
  name: string;
  price: number;
  productImage: string;
  rating: number;
  saler: User;
  slugs: string[];
  sold: number;
  variants: Variant[];
  _id: string;
}

export interface Variant {
  [key: string]: {
    propImgUrl: string;
    propName: string;
    propPrice: string;
  };
}
