import { ReviewsView } from "@/components/reviews-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
};

export default async function Reviews({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;

  const reviews = await tmdb.movie.reviews({
    id: id,
    page: page,
  });

  if (!reviews.results?.length) {
    return notFound();
  }

  return <ReviewsView.List reviews={reviews.results} />;
}
