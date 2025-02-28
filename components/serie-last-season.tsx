import { MediaImages } from "./media-image";
import { tmdb } from "@/tmdb/api";
import type { LastEpisodeToAir } from "@/tmdb/models";
import Link from "next/link";
import { cn } from "@/utils/tailwind";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { format } from "@/tmdb/utils";

type LastSeasonProps = {
  id: string | number;
  lastEpisode: LastEpisodeToAir;
  title: string;
  seasonScore: number;
  link?: string;
  linkTitle?: string;
};
export async function SerieLastSeason({
  id,
  lastEpisode,
  title,
  seasonScore,
  link,
  linkTitle,
}: LastSeasonProps) {
  const { overview, poster_path, episodes, air_date } =
    await tmdb.seasons.details({
      id: id,
      season: lastEpisode.season_number,
    });

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
      <div className="relative w-full md:h-80 flex flex-col md:flex-row bg-card rounded-md shadow">
        <div className="relative md:w-48 lg:w-56 shrink-0">
          <MediaImages.Poster
            className="border-none"
            image={poster_path}
            alt={lastEpisode.name}
          />
          {/* <div className="overlay" /> */}
        </div>
        <div className="p-4 md:p-10">
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            Season {lastEpisode.season_number}{" "}
            <span className="text-muted-foreground">
              ({format.year(air_date)})
            </span>
          </h2>
          <div className="my-4 gap-2 flex">
            <Badge variant="secondary" className="hover:bg-secondary">
              {seasonScore * 10}% User Score
            </Badge>
            <Badge variant="secondary" className="hover:bg-secondary">
              {episodes.length} Episodes
            </Badge>
          </div>
          <p className="mb-4 max-w-2xl text-muted-foreground">{overview}</p>
          <Link href={`/series/${id}/seasons`} className={cn(buttonVariants())}>
            View Seasons
          </Link>
          {/* <MovieCollectionDialog collection={collection} /> */}
        </div>
      </div>
    </div>
  );
}
