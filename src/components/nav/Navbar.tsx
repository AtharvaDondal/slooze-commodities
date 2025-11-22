"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useUser } from "@/lib/hooks";
import { Role } from "@/types";

export default function Navbar() {
  const user = useUser();

  /* ---------- helpers ---------- */
  const initials = (user?.email || "").split("@")[0].slice(0, 2).toUpperCase();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0"; // clear token cookie
    window.location.href = "/login"; // full reload to reset state
  };

  /* ---------- render ---------- */
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between bg-background">
      {/* Left nav */}
      <nav className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-medium hover:underline">
          Dashboard
        </Link>

        <Link href="/products" className="text-sm font-medium hover:underline">
          Products
        </Link>

        {/* Role-based extras */}
        {user?.role === Role.Manager && (
          <Link
            href="/products/new"
            className="text-sm font-medium hover:underline"
          >
            Add Product
          </Link>
        )}
      </nav>

      {/* Right area */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center cursor-pointer gap-2 px-2"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block text-sm">
                  {user.email}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent  className="cursor-pointer" align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
