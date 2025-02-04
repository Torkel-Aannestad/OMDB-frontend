import { ComponentProps } from "react";
import { MediaCard } from "./media-card";
import { cn } from "@/utils/tailwind";

type EmptyStateProps = ComponentProps<"div"> & {
  text: string;
};
export function EmptyStateCard({ text, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("", className)} {...props}>
      <MediaCard.Root
        className={cn(
          "h-56 w-full rounded-md border bg-muted  ",
          "bg-gradient-to-tr from-background/25"
        )}
      >
        <div className="flex items-center justify-center gap-2 size-full text-muted-foreground">
          {text}
        </div>
      </MediaCard.Root>
    </div>
  );
}
