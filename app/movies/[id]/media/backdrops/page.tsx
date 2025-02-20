import { BackdropList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function Backdrops({ params }: Props) {
  const { id } = await params;
  const { backdrops } = await tmdb.movie.images({
    id: id,
  });
  return <BackdropList images={backdrops} />;
}
