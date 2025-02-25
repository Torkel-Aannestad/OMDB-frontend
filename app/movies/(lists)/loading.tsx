import { ContainerWithSpacing } from "@/components/container";
import { MediaListViewSkeleton } from "@/components/media-list-view";

export default function Loading() {
  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <MediaListViewSkeleton />
    </ContainerWithSpacing>
  );
}
