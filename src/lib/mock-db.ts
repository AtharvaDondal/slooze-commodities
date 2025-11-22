import { User, Product, Role } from "@/types";
import bcrypt from "bcryptjs";
// ---- in-memory DB ----
export const usersDb: User[] = [
  {
    id: "1",
    email: "m@demo.com",
    passwordHash: bcrypt.hashSync("123456", 10),
    role: Role.Manager,
  },
  {
    id: "2",
    email: "s@demo.com",
    passwordHash: bcrypt.hashSync("123456", 10),
    role: Role.StoreKeeper,
  },
];
export const productsDb: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `p${i + 1}`,
  name: `Product ${i + 1}`,
  category: ["Fruit", "Vegetable", "Dairy", "Grain"][i % 4],
  price: +(Math.random() * 20).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
