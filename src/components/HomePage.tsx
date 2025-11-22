"'use client';";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-6">
        <h1 className="text-3xl font-bold">Slooze Commodities</h1>
        <p className="text-muted-foreground">Manage inventory with ease.</p>
        <Link href="/login">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      </div>
    </main>
  );
}
