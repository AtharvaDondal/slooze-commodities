import { NextRequest, NextResponse } from "next/server";
import { productsDb } from "@/lib/mock-db";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idx = productsDb.findIndex((p) => p.id === params.id);
  if (idx === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = await req.json();
  productsDb[idx] = {
    ...productsDb[idx],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(productsDb[idx]);
}
