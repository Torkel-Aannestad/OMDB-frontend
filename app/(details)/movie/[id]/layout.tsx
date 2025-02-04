import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { notFound } from "next/navigation";
import { format } from "@/tmdb/utils";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { MediaImages } from "@/components/media-image";
import { MovieCollection } from "@/components/movie-collection";

type DetailLayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { id } = await params;
  const { title } = await tmdb.movie.details({
    id: id,
  });

  return {
    title,
  };
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const { id } = await params;

  if (!id) notFound();
  return <div>{children}</div>;
}
