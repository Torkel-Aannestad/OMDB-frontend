import { notFound } from "next/navigation";
import { tmdb } from "@/tmdb/api";

type DetailLayoutProps = {
  params: {
    serieid: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { serieid } = await params;
  const { name } = await tmdb.series.details({
    id: serieid,
  });

  return {
    name,
  };
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const { serieid } = await params;

  if (!serieid) return notFound();

  return <>{children}</>;
}
