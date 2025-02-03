import { cn } from "@/utils/tailwind";
import { ComponentProps } from "react";
import { Badge, BadgeProps } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Container } from "./container";

function Root({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

function Backdrop({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "md:h-hero relative aspect-poster hidden w-full md:block",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Hero({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <Container className={cn("md:mt-8 xl:mt-12 ", className)} {...props}>
      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:gap-10 xl:gap-16">
        {children}
      </div>
    </Container>
  );
}

function Poster({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative aspect-poster w-full place-self-start md:-mt-32 md:block md:w-56 lg:w-64 xl:-mt-64 xl:w-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Content({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <Container
      className={cn(
        "mt-4 md:mt-8 xl:mt-12 space-y-4 md:space-y-8 xl:space-y-12",
        className
      )}
      {...props}
    >
      {children}
    </Container>
  );
}

function Genres({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

function Genre({ variant = "secondary", ...props }: BadgeProps) {
  return <Badge variant={variant} {...props} />;
}
function Rating({ variant = "secondary", ...props }: BadgeProps) {
  return <Badge variant={variant} {...props} />;
}

function Title({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn("text-2xl font-medium xl:text-4xl", className)}
      {...props}
    />
  );
}

function Overview({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("space-y-4 text-muted-foreground xl:text-lg", className)}
      {...props}
    >
      {children}
    </p>
  );
}
function ContentSpacer({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

export function SkeletonMediaDetail() {
  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <Skeleton className="size-full rounded-md" />
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <Skeleton className="size-full rounded-md" />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-4 w-60 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Skeleton className="mt-4 h-[30vh] w-full rounded-md" />
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}

export const MediaDetailView = {
  Root,
  Backdrop,
  Hero,
  Content,
  Poster,
  Genres,
  Genre,
  Rating,
  Title,
  Overview,
  ContentSpacer,
};
