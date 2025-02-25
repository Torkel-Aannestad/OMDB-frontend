import { Serie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

type SerieCardProps = Serie & {
  priority?: boolean;
};

export function SerieCard({
  priority = false,
  id,
  poster_path,
  name,
}: SerieCardProps) {
  return (
    <Link href={`/series/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster
          image={poster_path}
          alt={name}
          priority={priority}
        />
      </MediaCard.Root>
    </Link>
  );
}
