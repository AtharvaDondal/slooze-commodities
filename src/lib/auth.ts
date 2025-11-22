import { usersDb } from "./mock-db";
import bcrypt from "bcryptjs";
import { signJwt } from "./jwt";
import { User } from "@/types";
export async function authenticate(email: string, password: string) {
  const user = usersDb.find((u) => u.email === email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}
export async function loginUser(user: User) {
  const token = await signJwt({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return token;
}
