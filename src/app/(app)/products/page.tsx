import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import { Role } from "@/types";
import { ProductActions } from "@/components/products/ProductActions";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN || "http://localhost:3000"}/api/products`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>

        <RoleGate allowed={[Role.Manager]}>
          <Link href="/products/new">
            <Button className="cursor-pointer">Add Product</Button>
          </Link>
        </RoleGate>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>All commodities currently in stock</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">${p.price.toFixed(2)}</td>
                  <td className="p-2">{p.stock}</td>

                  <td className="p-2">
                    <ProductActions id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
