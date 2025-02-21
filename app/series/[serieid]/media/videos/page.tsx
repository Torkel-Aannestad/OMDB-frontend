import { VideoList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ serieid: string }>;
};
export default async function Videos({ params }: Props) {
  const { serieid } = await params;
  const { results } = await tmdb.series.videos({
    id: serieid,
  });
  return <VideoList videos={results} />;
}
