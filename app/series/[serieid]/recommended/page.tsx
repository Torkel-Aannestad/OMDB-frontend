import { MediaListView } from "@/components/media-list-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ serieid: string }>;
  searchParams: Promise<{ page: string }>;
};

export default async function Recommended({ params, searchParams }: Props) {
  const { serieid } = await params;
  const { page } = await searchParams;

  const recommended = await tmdb.series.recommendations({
    id: serieid,
    page: page,
  });

  if (!recommended.results?.length) {
    return notFound();
  }

  return (
    <MediaListView
      title="Recommended"
      series={recommended.results}
      currentPage={recommended.page}
      totalPages={recommended.total_pages}
      showCatgeoryOptions={false}
      showListOptions={false}
    />
  );
}
