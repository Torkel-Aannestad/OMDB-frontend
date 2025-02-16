import { MediaListView } from "@/components/media-list-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type PopularProps = {
  searchParams: Promise<{ page: string }>;
};

export default async function Popular({ searchParams }: PopularProps) {
  const params = await searchParams;

  const { results, total_pages, page } = await tmdb.series.list({
    list: "popular",
    page: params.page,
  });

  if (!results?.length) {
    return notFound();
  }

  return (
    <MediaListView
      title={"Popular"}
      series={results}
      currentPage={page}
      totalPages={total_pages}
      showListOptions={true}
      showCatgeoryOptions={true}
    />
  );
}
