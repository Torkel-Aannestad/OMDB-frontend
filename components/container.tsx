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

export function ContainerWithSpacing({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container px-4 md:px-10 lg:px-20 xl:px-28 2xl:px-32 mt-4 md:mt-8 xl:mt-12 space-y-4 md:space-y-8 xl:space-y-12",
        className
      )}
      {...props}
    />
  );
}
