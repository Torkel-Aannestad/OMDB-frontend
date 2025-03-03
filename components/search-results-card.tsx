import Link from "next/link";
import { MediaCard } from "@/components/media-card";
import { MediaImages } from "@/components/media-image";
import {
  MovieWithMediaType,
  PersonWithMediaType,
  SerieWithMediaType,
} from "@/tmdb/models";

type SearchResultCardProps = {
  media: MovieWithMediaType | SerieWithMediaType | PersonWithMediaType;
  priority?: boolean;
};

export function SearchResultCard({
  media,
  priority = false,
}: SearchResultCardProps) {
  const { media_type, id } = media;

  const isPerson = media_type === "person";
  const isMovie = media_type === "movie";

  let mediaTypeSlug;
  if (isMovie) {
    mediaTypeSlug = "movies";
  } else if (isPerson) {
    mediaTypeSlug = "people";
  } else {
    mediaTypeSlug = "series";
  }

  return (
    <Link href={`/${mediaTypeSlug}/${id}`} prefetch={false}>
      <MediaCard.Root>
        <MediaImages.Poster
          image={isPerson ? media.profile_path : media.poster_path}
          alt={isMovie ? media.title : media.name}
          priority={priority}
        />
        {isPerson && (
          <MediaCard.Content>
            <MediaCard.Title className="mt-2">{media.name}</MediaCard.Title>
          </MediaCard.Content>
        )}
        {/*<MediaCard.Content>
           {!isPerson && (
            <Badge
              variant={"secondary"}
              className="mr-2 hover:bg-secondary cursor-default"
            >
              {media.vote_average
                ? `${(media.vote_average * 10).toFixed(0)}% User Rating`
                : "N/A"}
            </Badge>
          )}
          <Badge
            className="capitalize hover:bg-secondary cursor-default"
            variant="secondary"
          >
            {media.media_type}
          </Badge>

          <MediaCard.Title className="mt-2">
            {isMovie ? media.title : media.name}
          </MediaCard.Title>

          <MediaCard.Excerpt>
            {isPerson
              ? `Known for ${media.known_for_department}`
              : format.year(
                  isMovie ? media.release_date : media.first_air_date
                )}
          </MediaCard.Excerpt>
        </MediaCard.Content> */}
      </MediaCard.Root>
    </Link>
  );
}
