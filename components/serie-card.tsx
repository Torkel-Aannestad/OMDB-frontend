import { Serie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaPoster } from "./media-poster";

export function SerieCard({ id, poster_path, name }: Serie) {
  return (
    <Link href={`/movie/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaPoster image={poster_path} alt={name} />
      </MediaCard.Root>
    </Link>
  );
}
