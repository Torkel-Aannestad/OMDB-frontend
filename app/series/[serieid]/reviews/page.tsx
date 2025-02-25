import { ReviewsView } from "@/components/reviews-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ serieid: string }>;
  searchParams: Promise<{ page: string }>;
};

export default async function Reviews({ params, searchParams }: Props) {
  const { serieid } = await params;
  const { page } = await searchParams;

  const reviews = await tmdb.series.reviews({
    id: serieid,
    page: page,
  });

  return <ReviewsView.List reviews={reviews.results} />;
}
