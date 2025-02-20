import { CastCarousel } from "@/components/cast-carousel";
import { Reviews } from "@/components/reviews-view";
import { VideoImageCarousel } from "@/components/video-image-view";
import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { MediaImages } from "@/components/media-image";
import { SerieRecommendedCarousel } from "@/components/serie-recommened-carousel";
import { SerieLastSeason } from "@/components/serie-last-season";

type DetailProps = {
  params: Promise<{ id: string }>;
};
export default async function Details({ params }: DetailProps) {
  const { id } = await params;

  const {
    name,
    overview,
    genres,
    vote_average,
    backdrop_path,
    poster_path,
    tagline,
    first_air_date,
    seasons,
    last_episode_to_air,
  } = await tmdb.series.details({
    id: id,
  });

  const { crew } = await tmdb.series.credits({
    id: id,
  });
  const director = crew.find((crew) => crew.job === "Director");

  const { cast } = await tmdb.series.credits({
    id: id,
  });

  const { results } = await tmdb.series.reviews({
    id: id,
  });
  const review = results[0];
  const numberOfReviews = results.length;

  const videos = (await tmdb.series.videos({ id: id })).results;

  const { posters, backdrops } = await tmdb.series.images({
    id: id,
  });

  const recommendedMoviesSliced = (
    await tmdb.series.recommendations({ id: id })
  ).results.slice(0, 20);

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaImages.Backdrop alt={name} image={backdrop_path} priority />
        <div className="overlay-top" />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaImages.Poster
            image={poster_path}
            alt={name}
            size="w780"
            priority
          />
        </MediaDetailView.Poster>
        <div className="space-y-4">
          <MediaDetailView.Title>
            {name}{" "}
            <span className="font-light text-muted-foreground">
              ({format.year(format.date(first_air_date))})
            </span>
          </MediaDetailView.Title>
          <MediaDetailView.Genres>
            <MediaDetailView.Rating>
              {vote_average
                ? `${(vote_average * 10).toFixed(0)}% User Rating`
                : "N/A"}
            </MediaDetailView.Rating>
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
      <MediaDetailView.Content>
        <CastCarousel title={"Cast"} items={cast} />
        <SerieLastSeason
          id={id}
          lastEpisode={last_episode_to_air}
          title={"Last Season"}
          link={""}
          linkTitle={""}
        />

        <Reviews.Single
          title="Reviews"
          review={review}
          numberOfReviews={numberOfReviews}
        />
        <VideoImageCarousel
          title="Media"
          videos={videos}
          posters={posters}
          backdrops={backdrops}
          link={`/series/${id}/media/posters`}
          linkTitle="View All Media"
        />

        <SerieRecommendedCarousel
          title={"Recommended"}
          items={recommendedMoviesSliced}
        />
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
