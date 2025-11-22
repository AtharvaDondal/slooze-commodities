import { NextRequest, NextResponse } from "next/server";
import { authenticate, loginUser } from "@/lib/auth";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const user = await authenticate(email, password);
  if (!user)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  const token = await loginUser(user);
  const res = NextResponse.json({
    user: { id: user.id, email: user.email, role: user.role },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
