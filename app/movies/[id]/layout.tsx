import { notFound } from "next/navigation";
import { tmdb } from "@/tmdb/api";

type DetailLayoutProps = {
  params: {
    id: string;
  };
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

  if (!id) return notFound();

  return <>{children}</>;
}
