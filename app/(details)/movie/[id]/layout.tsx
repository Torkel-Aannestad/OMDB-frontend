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
  params: {
    id: string;
  };
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
  const {
    id,
    title,
    overview,
    genres,
    vote_average,
    vote_count,
    backdrop_path,
    poster_path,
    release_date,
    tagline,
  } = await tmdb.movie.details({
    id: params.id,
  });

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
          <MediaDetailView.Genres>
            <MediaDetailView.Genre>
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </MediaDetailView.Genre>

            {genres?.map((genre) => (
              <MediaDetailView.Genre key={genre.id}>
                {genre.name}
              </MediaDetailView.Genre>
            ))}
          </MediaDetailView.Genres>

          <MediaDetailView.Title>
            {title}{" "}
            <span className="font-light text-muted-foreground">
              ({format.year(format.date(release_date))})
            </span>
          </MediaDetailView.Title>

          {tagline && (
            <MediaDetailView.Overview>
              &quot;{tagline}&quot;
            </MediaDetailView.Overview>
          )}
          <MediaDetailView.Overview>{overview}</MediaDetailView.Overview>
        </div>
      </MediaDetailView.Hero>
      <MediaDetailView.Title>Hi here</MediaDetailView.Title>
    </MediaDetailView.Root>
  );
}
