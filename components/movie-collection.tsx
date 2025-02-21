import { MediaImages } from "./media-image";
import { tmdb } from "@/tmdb/api";
import Link from "next/link";
import { cn } from "@/utils/tailwind";
import { buttonVariants } from "./ui/button";
import { MovieCollectionDialog } from "./movie-collection-dialog";

type MovieCollectionProps = {
  id: string | number;
  title: string;
  link?: string;
  linkTitle?: string;
};
export async function MovieCollection({
  id,
  title,
  link,
  linkTitle,
}: MovieCollectionProps) {
  const collection = await tmdb.collections.details({ id: id });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4 md:justify-start">
        <h2 className="font-medium md:text-lg">{title}</h2>
        {link && (
          <Link
            href={link}
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "text-xs"
            )}
          >
            {linkTitle}
          </Link>
        )}
      </div>
      <div className="relative h-80 lg:h-[450px]">
        <MediaImages.Backdrop
          className=" rounded-md"
          image={collection.backdrop_path}
          alt={collection.name}
        />
        <div className="overlay">
          <div className="p-4 md:p-10">
            <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
              Part of
            </p>
            <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
              {collection.name}
            </h2>
            <p className="mb-4 line-clamp-1 max-w-2xl text-muted-foreground">
              Includes: {collection.parts.map((part) => part.title).join(", ")}
            </p>
            <MovieCollectionDialog collection={collection} />
          </div>
        </div>
      </div>
    </div>
  );
}
