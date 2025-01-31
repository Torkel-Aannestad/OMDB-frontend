import { BackdropSize, tmdbImage } from "@/tmdb/utils";
import { cn } from "@/utils/tailwind";
import { ComponentProps } from "react";
import { Icons } from "./icons";
import Image from "next/image";

type MediaBackDropProps = ComponentProps<"div"> & {
  image?: string;
  size?: BackdropSize;
  alt: string;
  priority?: boolean;
};

export function MediaBackDrop({
  image,
  size = "original",
  alt,
  className,
  priority,
  ...props
}: MediaBackDropProps) {
  const src = image ? tmdbImage.backdrop(image, size) : null;

  if (!src) {
    return (
      <div
        className={cn(
          "size-full rounded-b-md border bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center size-full">
          <Icons.Logo className="size-12" />
        </div>
      </div>
    );
  }
  return (
    <Image
      className={cn(
        "size-full rounded-b-md border bg-muted object-cover",
        className
      )}
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      fill
    />
  );
}
