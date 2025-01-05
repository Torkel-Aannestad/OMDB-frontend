import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container space-y-8">
      <Skeleton className="h-[60vh] min-h-[560px] rounded-md" />
    </div>
  );
}
