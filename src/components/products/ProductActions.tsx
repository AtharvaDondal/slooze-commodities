"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Role } from "@/types";
import RoleGate from "../RoleGate";

type Props = { id: string };
export function ProductActions({ id }: Props) {
  return (
    <RoleGate allowed={[Role.Manager]}>
      <Link href={`/products/${id}`}>
        <Button className="cursor-pointer" variant="ghost" size="sm">
          Edit
        </Button>
      </Link>
    </RoleGate>
  );
}
