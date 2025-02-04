import { CastCarousel } from "@/components/cast-carousel";
import { Reviews } from "@/components/reviews-view";
import { VideoImageCarousel } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

interface DetailProps {
  params: Promise<{ id: string }>;
}
export default async function Details({ params }: DetailProps) {
  const { id } = await params;
  const { cast } = await tmdb.movie.credits({
    id: id,
  });
  const { results } = await tmdb.movie.reviews({
    id: id,
  });
  const review = results[0];
  const numberOfReviews = results.length;

  const videos = (await tmdb.movie.videos({ id: id })).results.slice(0, 20);
  const { posters, backdrops } = await tmdb.movie.images({
    id: id,
  });

  return (
    <>
      {/* Cast carousel */}
      <CastCarousel title={"Cast"} items={cast} />
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
        link="/"
        linkTitle="View All Media"
      />
    </>
  );
}
