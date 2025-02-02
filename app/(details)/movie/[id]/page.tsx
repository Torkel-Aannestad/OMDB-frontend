import { CastCarousel } from "@/components/cast-carousel";
import { tmdb } from "@/tmdb/api";

interface DetailProps {
  params: Promise<{ id: string }>;
}
export default async function Details({ params }: DetailProps) {
  const { id } = await params;
  const { cast } = await tmdb.movie.credits({
    id: id,
  });
  return (
    <>
      {/* Cast carousel */}
      <CastCarousel title={"Cast"} items={cast} />
    </>
  );
}
