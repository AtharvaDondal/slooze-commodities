import ProductForm from '@/components/products/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <ProductForm />
    </div>
  );
}