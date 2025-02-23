import { Movie } from "@/tmdb/models";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

type MovieCardProps = Movie & {
  priority?: boolean;
};

export function MovieCard({
  priority = false,
  id,
  poster_path,
  title,
}: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`} key={id}>
      <MediaCard.Root>
        <MediaImages.Poster
          image={poster_path}
          alt={title}
          priority={priority}
        />
      </MediaCard.Root>
    </Link>
  );
}
