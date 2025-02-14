import { Movie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

export function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link href={`/movies/${id}`} key={id}>
      <MediaCard.Root>
        <MediaImages.Poster image={poster_path} alt={title} />
      </MediaCard.Root>
    </Link>
  );
}
