import Image from "next/image";
import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";
import { MediaBackDrop } from "@/components/media-backdrop";
import { MediaPoster } from "@/components/media-poster";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "@/tmdb/utils";

interface DetailLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

// export async function generateMetadata({ params }: DetailLayoutProps) {
//   const { title } = await tmdb.movie.details({
//     id: params.id,
//   });

//   return {
//     title,
//   };
// }
export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const { id } = await params;

  const {
    title,
    overview,
    genres,
    vote_average,
    vote_count,
    backdrop_path,
    poster_path,
    release_date,
    tagline,
    runtime,
  } = await tmdb.movie.details({
    id: id,
  });

  const { crew, cast } = await tmdb.movie.credits({
    id: id,
  });
  const director = crew.find((crew) => crew.job === "Director");

  if (!id) notFound();
  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackDrop alt={title} image={backdrop_path} priority />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster image={poster_path} alt={title} size="w780" priority />
        </MediaDetailView.Poster>
        <div className="space-y-4">
          <MediaDetailView.Title>
            {title}{" "}
            <span className="font-light text-muted-foreground">
              ({format.year(format.date(release_date))})
            </span>
          </MediaDetailView.Title>
          <MediaDetailView.Genres>
            <MediaDetailView.Rating>
              {vote_average
                ? `${(vote_average * 10).toFixed(0)}% User Rating`
                : "N/A"}
            </MediaDetailView.Rating>
            <MediaDetailView.Genre>
              {format.runtime(runtime)}
            </MediaDetailView.Genre>
          </MediaDetailView.Genres>
          <MediaDetailView.Genres>
            {genres?.map((genre) => (
              <MediaDetailView.Genre key={genre.id}>
                {genre.name}
              </MediaDetailView.Genre>
            ))}
          </MediaDetailView.Genres>

          {tagline && (
            <MediaDetailView.Overview>
              &quot;{tagline}&quot;
            </MediaDetailView.Overview>
          )}
          <MediaDetailView.Overview>{overview}</MediaDetailView.Overview>
          <MediaDetailView.Overview>
            {director && (
              <span className="flex flex-col ">
                <span className="font-bold">{director.name}</span>
                <span>{director.job}</span>
              </span>
            )}
          </MediaDetailView.Overview>
        </div>
      </MediaDetailView.Hero>
      <MediaDetailView.Content>{children}</MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
