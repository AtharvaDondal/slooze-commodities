import { notFound } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { productsDb } from "@/lib/mock-db";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = productsDb.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
