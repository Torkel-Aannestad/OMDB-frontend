import { cn } from "@/utils/tailwind";
import { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
