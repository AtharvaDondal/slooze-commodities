"use client";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import { Role } from "@/types";

type Props = {
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  return (
    <div className="rounded border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">${p.price.toFixed(2)}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">
                <RoleGate allowed={[Role.Manager]}>
                  <Link href={`/products/${p.id}`}>
                    <Button className="cursor-pointer" variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </RoleGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
