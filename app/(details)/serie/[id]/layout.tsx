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
  const { name } = await tmdb.series.details({
    id: id,
  });

  return {
    name,
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
