import { PosterList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Posters({ params }: Props) {
  const { id } = await params;
  const { posters } = await tmdb.movie.images({
    id: id,
  });
  return <PosterList images={posters} />;
}
