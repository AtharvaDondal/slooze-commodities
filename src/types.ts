export enum Role {
  Manager = "Manager",
  StoreKeeper = "StoreKeeper",
}
export interface User {
  id: string;
  email: string;
  passwordHash: string; // hidden from client
  role: Role;
}
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}
