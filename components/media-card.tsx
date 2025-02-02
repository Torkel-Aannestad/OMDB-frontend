import { ComponentProps } from "react";

import { cn } from "@/utils/tailwind";

function Root({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("relative aspect-poster", className)} {...props} />;
}

function Content({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("overlay", className)} {...props}>
      <div className="p-2">{children}</div>
    </div>
  );
}

function Title({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "line-clamp-1 text-sm font-medium md:text-base",

        className
      )}
      {...props}
    />
  );
}

function Excerpt({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "line-clamp-3 text-xs text-muted-foreground md:text-sm",

        className
      )}
      {...props}
    />
  );
}

export const MediaCard = {
  Root,
  Content,
  Title,
  Excerpt,
};
