"use client";
import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  useActiveNavItem,
  useActiveSearchQuery,
} from "@/hooks/useActiveNavItem";
import { ComponentProps } from "react";
import { cn } from "@/utils/tailwind";
import { movieCategories, serieCategories } from "@/tmdb/utils/categories";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

function Main({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}

function ListTabs({ className, children }: ComponentProps<"div">) {
  return (
    <Tabs>
      <TabsList>{children}</TabsList>
    </Tabs>
  );
}

type CategoriesProps = {
  media_type: "movie" | "serie";
};
function Categories({ media_type }: CategoriesProps) {
  return (
    <ScrollArea className="whitespace-nowrap w-full">
      <div className="pb-3 flex items-center gap-2">
        {media_type === "movie"
          ? movieCategories.map((cat) => (
              <ItemSearchParams
                key={cat.id}
                href={`/movies/categories?with_genres=${cat.id}`}
                searchVariable={"with_genres"}
                searchValue={cat.id.toString()}
                title={cat.name}
              />
            ))
          : serieCategories.map((cat) => (
              <ItemSearchParams
                key={cat.id}
                href={`/series/categories?with_genres=${cat.id}`}
                title={cat.name}
                searchVariable={"with_genres"}
                searchValue={cat.id.toString()}
              />
            ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2 cursor-grab" />
    </ScrollArea>
  );
}

type NavitemProps = ComponentProps<"div"> & { href: string; title: string };
function Item({ href, title, className }: NavitemProps) {
  const isActive = useActiveNavItem(href);
  return (
    <Link href={href}>
      <Badge
        className={cn("py-2 text-sm", className)}
        variant={isActive ? "outline" : "ghost"}
      >
        {title}
      </Badge>
    </Link>
  );
}

type NavitemSearchParamsProps = NavitemProps & {
  searchVariable: string;
  searchValue: string;
};
function ItemSearchParams({
  href,
  searchVariable,
  searchValue,
  title,
  className,
}: NavitemSearchParamsProps) {
  const isActive = useActiveSearchQuery(searchVariable, searchValue);
  return (
    <Link href={href}>
      <Badge
        className={cn("py-2 text-sm", className)}
        variant={isActive ? "outline" : "ghost"}
      >
        {title}
      </Badge>
    </Link>
  );
}

export const MediaListNav = {
  Main,
  ListTabs,
  Item,
  Categories,
};
