import React from "react";
import Link from "next/link";
import { Cast } from "@/tmdb/models";

import { MediaCard } from "@/components/media-card";
import { MediaImages } from "./media-image";

type PersonCardProps = Cast & {
  priority?: boolean;
};

export function PersonCard({
  priority = false,
  id,
  name,
  profile_path,
  known_for_department,
}: PersonCardProps) {
  return (
    <Link href={`/person/${id}`} key={id} className="w-full" prefetch={false}>
      <MediaCard.Root>
        <MediaCard.Content>
          <MediaImages.Poster
            image={profile_path}
            alt={name}
            priority={priority}
          />
          <MediaCard.Title className="mt-2">{name}</MediaCard.Title>

          <MediaCard.Excerpt>
            Known for {known_for_department}
          </MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
}
