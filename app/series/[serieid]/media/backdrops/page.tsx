import { BackdropList } from "@/components/video-image-view";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ serieid: string }>;
};
export default async function Backdrops({ params }: Props) {
  const { serieid } = await params;
  const { backdrops } = await tmdb.series.images({
    id: serieid,
  });
  return <BackdropList images={backdrops} />;
}
