import { movieCategories, serieCategories } from "@/tmdb/utils/categories";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { cn } from "@/utils/tailwind";

type MediaCategoryProps = {
  title: string;
  media_type: "movie" | "serie";
};
export function MediaCategories({ title, media_type }: MediaCategoryProps) {
  return (
    <div className="">
      <h2 className="mb-4 font-medium md:text-xl">{title}</h2>

      <div>
        <Categories media_type={media_type} />
      </div>
    </div>
  );
}

type CategoriesProps = {
  media_type: "movie" | "serie";
};
function Categories({ media_type }: CategoriesProps) {
  return (
    <ScrollArea className="whitespace-nowrap overflow-x-hidden w-full">
      <div className="pb-3 flex items-center gap-2 lg:gap-4">
        {media_type === "movie"
          ? movieCategories.map((cat) => (
              <Item
                key={cat.id}
                href={`/movies/categories?with_genres=${cat.id}`}
                title={cat.name}
              />
            ))
          : serieCategories.map((cat) => (
              <Item
                key={cat.id}
                href={`/series/categories?with_genres=${cat.id}`}
                title={cat.name}
              />
            ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2 cursor-grab " />
    </ScrollArea>
  );
}

type ItemProps = {
  href: string;
  title: string;
};
function Item({ href, title }: ItemProps) {
  return (
    <Link href={href}>
      <Badge className={cn("py-2 text-sm md:text-base")} variant={"outline"}>
        {title}
      </Badge>
    </Link>
  );
}
