import { Season } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

type SeasonCardProps = Season & {
  serieId: string;
};

export function SeasonCard({
  id,
  poster_path,
  name,
  vote_average,
  episode_count,
  serieId,
}: SeasonCardProps) {
  return (
    <Link href={`/series/${serieId}/seasons/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster image={poster_path} alt={name} />
        <MediaCard.Content>
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{episode_count} episodes</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
