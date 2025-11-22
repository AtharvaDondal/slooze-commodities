import RoleGate from '@/components/RoleGate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { productsDb } from '@/lib/mock-db';
import { Role } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const total = productsDb.length;
  const lowStock = productsDb.filter((p) => p.stock < 10).length;
  const categories = new Set(productsDb.map((p) => p.category)).size;

  return (
    <RoleGate allowed={[Role.Manager]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock (&lt;10)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managers</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Link href="/products/new">
              <button className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Add Product
              </button>
            </Link>
            <Link href="/products">
              <button className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                View All Products
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </RoleGate>
  );
}