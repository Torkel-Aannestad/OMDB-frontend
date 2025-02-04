import { MediaImages } from "./media-image";
import { tmdb } from "@/tmdb/api";
import type { Episode, LastEpisodeToAir } from "@/tmdb/models";
import Link from "next/link";
import { cn } from "@/utils/tailwind";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { MediaCard } from "./media-card";
import { format } from "@/tmdb/utils";

type LastSeasonProps = {
  id: string | number;
  lastEpisode: LastEpisodeToAir;
  title: string;
  link?: string;
  linkTitle?: string;
};
export async function SerieLastSeason({
  id,
  lastEpisode,
  title,
  link,
  linkTitle,
}: LastSeasonProps) {
  const { overview, poster_path, episodes, air_date } =
    await tmdb.seasons.details({
      id: id,
      season: lastEpisode.season_number,
    });

  function getSeasonScore(episodes: Episode[]) {
    let seasonScore = 0;
    for (let i = 0; i < episodes.length; i++) {
      seasonScore += episodes[i].vote_average;
    }
    return ((seasonScore / episodes.length) * 10).toFixed(0);
  }
  const seasonScore = getSeasonScore(episodes);

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
      <div className="relative w-full h-80 flex ">
        <div className="relative w-44 sm:w-56 shrink-0">
          <MediaImages.Poster image={poster_path} alt={lastEpisode.name} />
          {/* <div className="overlay" /> */}
        </div>
        <div className="p-4 md:p-10">
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            Season {lastEpisode.season_number}{" "}
            <span className="text-muted-foreground">
              ({format.year(air_date)})
            </span>
          </h2>
          <div className="my-4 max-w-2xl gap-2 flex">
            <Badge variant="secondary" className="hover:bg-secondary">
              User Score {seasonScore}%
            </Badge>
            <Badge variant="secondary" className="hover:bg-secondary">
              {episodes.length} Episodes
            </Badge>
          </div>
          <p className="mb-4 max-w-2xl text-muted-foreground">{overview}</p>
          <Link href={"/"} className={cn(buttonVariants())}>
            View Seasons
          </Link>
          {/* <MovieCollectionDialog collection={collection} /> */}
        </div>
      </div>
    </div>
  );
}
