import Link from "next/link";
import { Cast } from "@/tmdb/models";

import { MediaCard } from "@/components/media-card";
import { MediaImages } from "./media-image";

type CastCardProps = Cast & {
  priority?: boolean;
};
export function CastCard({
  priority = false,
  id,
  name,
  profile_path,
  character,
}: CastCardProps) {
  return (
    <Link href={`/people/${id}`}>
      <MediaCard.Root>
        <MediaImages.Poster
          image={profile_path}
          alt={name}
          priority={priority}
        />
        <MediaCard.Content>
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
