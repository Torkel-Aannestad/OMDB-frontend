import { MediaListView } from "@/components/media-list-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
};

export default async function Similar({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;

  const similar = await tmdb.series.similar({
    id: id,
    page: page,
  });

  if (!similar.results?.length) {
    return notFound();
  }

  return (
    <MediaListView
      title="Similar Series"
      series={similar.results}
      currentPage={similar.page}
      totalPages={similar.total_pages}
      showCatgeoryOptions={false}
      showListOptions={false}
    />
  );
}
