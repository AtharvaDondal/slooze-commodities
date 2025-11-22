import { NextRequest, NextResponse } from "next/server";
import { productsDb } from "@/lib/mock-db";
import { randomUUID } from "crypto";
export async function GET() {
  return NextResponse.json(productsDb);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const newProduct = {
    ...body,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  productsDb.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
