import { CastCarousel } from "@/components/cast-carousel";
import { MovieRecommendedCarousel } from "@/components/movie-recommened-carousel";
import { ReviewsView } from "@/components/reviews-view";
import { VideoImageCarousel } from "@/components/video-image-view";
import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { MediaImages } from "@/components/media-image";
import { MovieCollection } from "@/components/movie-collection";
import Link from "next/link";

type DetailProps = {
  params: Promise<{ id: string }>;
};
export default async function Details({ params }: DetailProps) {
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

  const { cast } = await tmdb.movie.credits({
    id: id,
  });

  const { results } = await tmdb.movie.reviews({
    id: id,
  });
  const review = results[0];
  const numberOfReviews = results.length;

  const videos = (await tmdb.movie.videos({ id: id })).results;

  const { posters, backdrops } = await tmdb.movie.images({
    id: id,
  });

  const recommendedMoviesSliced = (
    await tmdb.movie.recommendations({ id: id })
  ).results.slice(0, 20);

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
          <div className="overlay-hero-top md:hidden" />
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
              <Link
                key={genre.id}
                href={`/movies/categories?with_genres=${genre.id}`}
              >
                <MediaDetailView.Genre key={genre.id}>
                  {genre.name}
                </MediaDetailView.Genre>
              </Link>
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
      <MediaDetailView.Content>
        <CastCarousel title={"Cast"} items={cast} />

        <ReviewsView.Single
          title="Reviews"
          review={review}
          numberOfReviews={numberOfReviews}
          link={`/movies/${id}/reviews`}
          linkTitle="All Reviews"
        />

        <VideoImageCarousel
          title="Media"
          videos={videos}
          posters={posters}
          backdrops={backdrops}
          link={`/movies/${id}/media/videos`}
          linkTitle="View All Media"
        />

        {belongs_to_collection && (
          <MovieCollection
            id={belongs_to_collection.id}
            title={"Collection"}
            // link={""}
            // linkTitle={""}
          />
        )}

        <MovieRecommendedCarousel
          title={"Recommended"}
          items={recommendedMoviesSliced}
          link={`/movies/${id}/recommended`}
          linkTitle="View All Recommended"
        />
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
