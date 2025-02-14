import { MovieList } from "@/components/movie-list";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function TopRated({ searchParams }: Props) {
  const params = await searchParams;

  const { results, total_pages, page } = await tmdb.movie.list({
    list: "top_rated",
    page: params.page,
  });

  if (!results?.length) {
    return notFound();
  }

  return (
    <MovieList
      title="Top Rated"
      items={results}
      currentPage={page}
      totalPages={total_pages}
    />
  );
}
