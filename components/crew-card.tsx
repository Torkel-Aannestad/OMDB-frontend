import Link from "next/link";
import { Crew } from "@/tmdb/models";

import { MediaCard } from "@/components/media-card";
import { MediaImages } from "./media-image";

type CrewCardProps = Crew & {
  priority?: boolean;
};

export function CrewCard({
  priority = false,
  id,
  name,
  profile_path,
  job,
}: CrewCardProps) {
  return (
    <Link href={`/person/${id}`} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster
          image={profile_path}
          alt={name}
          priority={priority}
        />
        <MediaCard.Content>
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{job}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
