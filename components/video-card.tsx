import { ComponentProps } from "react";
import Image from "next/image";
import { yt } from "@/tmdb/utils/youtube";
import { PlayCircle } from "lucide-react";

import { cn } from "@/utils/tailwind";

interface VideoCardProps extends ComponentProps<"div"> {
  name: string;
  ytKey: string;
}

export function VideoCard({
  name,
  ytKey,
  className,
  ...props
}: VideoCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-video rounded-md cursor-pointer bg-muted",
        className
      )}
      {...props}
    >
      <Image
        className="size-full rounded-md border object-cover"
        src={yt.thumbnail(ytKey)}
        alt={name}
        unoptimized
        fill
      />
      <div className="overlay">
        <div className="p-2 md:p-4">
          <h3 className="line-clamp-2 font-semibold md:text-base">{name}</h3>
          <PlayCircle className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
