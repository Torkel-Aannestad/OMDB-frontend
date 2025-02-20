import { VideoList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Videos({ params }: Props) {
  const { id } = await params;
  const { results } = await tmdb.movie.videos({
    id: id,
  });
  return <VideoList videos={results} />;
}
