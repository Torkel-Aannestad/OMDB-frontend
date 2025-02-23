import { ContainerWithSpacing } from "@/components/container";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { MediaListViewSkeleton } from "@/components/media-list-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <MediaListViewSkeleton />
    </ContainerWithSpacing>
  );
}
