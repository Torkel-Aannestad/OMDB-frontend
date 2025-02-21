import { PosterList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ serieid: string }>;
};
export default async function Posters({ params }: Props) {
  const { serieid } = await params;
  const { posters } = await tmdb.series.images({
    id: serieid,
  });
  return <PosterList images={posters} />;
}
