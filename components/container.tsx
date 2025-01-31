import { cn } from "@/utils/tailwind";
import { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container px-4 md:px-10 lg:px-20 xl:px-28 2xl:px-32 ",
        className
      )}
      {...props}
    />
  );
}
