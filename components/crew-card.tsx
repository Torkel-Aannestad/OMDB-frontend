import Link from "next/link";
import { Crew } from "@/tmdb/models";

import { MediaCard } from "@/components/media-card";
import { MediaImages } from "./media-image";

export function CrewCard({ id, name, profile_path, job }: Crew) {
  return (
    <Link href={`/person/${id}`} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster image={profile_path} alt={name} />
        <MediaCard.Content>
          <MediaCard.Title>{name}</MediaCard.Title>
          <MediaCard.Excerpt>{job}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
