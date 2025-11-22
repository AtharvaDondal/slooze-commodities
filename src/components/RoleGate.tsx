"use client";
import { useUser } from "@/lib/hooks";
import { Role } from "@/types";
import { ReactNode } from "react";
export default function RoleGate({
  allowed,
  children,
}: {
  allowed: Role[];
  children: ReactNode;
}) {
  const user = useUser();
  if (!user || !allowed.includes(user.role)) return null;
  return <>{children}</>;
}
