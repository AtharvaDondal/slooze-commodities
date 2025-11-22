import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("token")?.value;
  if (!cookie) return NextResponse.json({ user: null }, { status: 401 });
  const payload = await verifyJwt(cookie);
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user: payload });
}
