import { CastCarousel } from "@/components/cast-carousel";
import { Reviews } from "@/components/reviews-view";
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
  const numberOfReviews = results.length;
  return (
    <>
      {/* Cast carousel */}
      <CastCarousel title={"Cast"} items={cast} />
      <Reviews.Single
        title="Reviews"
        review={results[0]}
        numberOfReviews={numberOfReviews}
      />
    </>
  );
}
