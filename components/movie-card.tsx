import { Movie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaPoster } from "./media-poster";

export function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link href={`/movie/${id}`} key={id}>
      <MediaCard.Root>
        <MediaPoster image={poster_path} alt={title} />
      </MediaCard.Root>
    </Link>
  );
}
