import { MovieList } from "@/components/movie-list";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type PopularProps = {
  searchParams: Promise<{ page: string }>;
};

export default async function Popular({ searchParams }: PopularProps) {
  const params = await searchParams;
  //   const pageQuery = page ?? "1";
  const { results, total_pages, page } = await tmdb.movie.list({
    list: "popular",
    page: params.page,
  });

  if (!results?.length) {
    return notFound();
  }

  return (
    <MovieList
      title="Popular"
      items={results}
      currentPage={page}
      totalPages={total_pages}
    />
  );
}
