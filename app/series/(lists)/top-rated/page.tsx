import { MediaListView } from "@/components/media-list-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function TopRated({ searchParams }: Props) {
  const params = await searchParams;

  const { results, total_pages, page } = await tmdb.series.list({
    list: "top_rated",
    page: params.page,
  });

  if (!results?.length) {
    return notFound();
  }

  return (
    <MediaListView
      title={"Top Rated"}
      series={results}
      currentPage={page}
      totalPages={total_pages}
      showListOptions={true}
      showCatgeoryOptions={false}
      backButtonHref="/series"
      backButtonText="Back to Series"
    />
  );
}
