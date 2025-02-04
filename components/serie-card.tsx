import { Serie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

export function SerieCard({ id, poster_path, name }: Serie) {
  return (
    <Link href={`/movie/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster image={poster_path} alt={name} />
      </MediaCard.Root>
    </Link>
  );
}
