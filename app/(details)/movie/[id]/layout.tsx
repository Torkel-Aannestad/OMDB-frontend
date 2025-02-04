import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";
import { format } from "@/tmdb/utils";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { MediaImages } from "@/components/media-image";
import { MovieCollection } from "@/components/movie-collection";

type DetailLayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { id } = await params;
  const { title } = await tmdb.movie.details({
    id: id,
  });

  return {
    title,
  };
}

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
    backdrop_path,
    poster_path,
    release_date,
    tagline,
    runtime,
    belongs_to_collection,
  } = await tmdb.movie.details({
    id: id,
  });

  const { crew } = await tmdb.movie.credits({
    id: id,
  });
  const director = crew.find((crew) => crew.job === "Director");
  const videos = (await tmdb.movie.videos({ id: id })).results;

  if (!id) notFound();
  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaImages.Backdrop alt={title} image={backdrop_path} priority />
        <div className="overlay-top" />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaImages.Poster
            image={poster_path}
            alt={title}
            size="w780"
            priority
          />
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
          <MediaDetailView.ContentSpacer>
            <MediaTrailerDialog videos={videos} />
          </MediaDetailView.ContentSpacer>
        </div>
      </MediaDetailView.Hero>
      <MediaDetailView.Content>{children}</MediaDetailView.Content>
      {belongs_to_collection && (
        <MediaDetailView.Content>
          <MovieCollection
            id={belongs_to_collection.id}
            title={"Collection"}
            // link={""}
            // linkTitle={""}
          />
        </MediaDetailView.Content>
      )}
    </MediaDetailView.Root>
  );
}
