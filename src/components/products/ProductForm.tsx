"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  price: z.number().positive("Must be > 0"),
  stock: z.int().nonnegative("Must be ≥ 0"),
});

type Values = z.infer<typeof schema>;

type Props = {
  product?: {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
  };
};

export default function ProductForm({ product }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: product ?? { name: "", category: "", price: 0, stock: 0 },
  });

  const onSubmit = async (data: Values) => {
    const url = product ? `/api/products/${product.id}` : "/api/products";
    const res = await fetch(url, {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("save failed. Please try again.");
      return;
    }

    toast.success(`Product ${product ? "updated" : "created"} successfully!`);
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>Category</Label>
        <Select
          defaultValue={product?.category || ""}
          onValueChange={(val) => setValue("category", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fruit">Fruit</SelectItem>
            <SelectItem value="Vegetable">Vegetable</SelectItem>
            <SelectItem value="Dairy">Dairy</SelectItem>
            <SelectItem value="Grain">Grain</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label>Price ($)</Label>
        <Input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label>Stock (units)</Label>
        <Input type="number" {...register("stock", { valueAsNumber: true })} />
        {errors.stock && (
          <p className="text-sm text-destructive">{errors.stock.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : product ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
