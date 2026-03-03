import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type CategoryTagProps = ComponentProps<"div">;

export function CategoryTag({ className, ...props }: CategoryTagProps) {
  return (
    <div
      className={cn(
        "text-sm font-medium leading-[20px]",
        "flex items-center justify-center",
        "px-3 py-1 rounded-full",
        className,
      )}
      {...props}
    />
  );
}
