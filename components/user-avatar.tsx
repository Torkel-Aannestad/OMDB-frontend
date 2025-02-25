import { ComponentProps } from "react";
import Image from "next/image";
import { ProfileSize, tmdbImage } from "@/tmdb/utils";

import { cn } from "@/utils/tailwind";

type UserAvatarProps = ComponentProps<"div"> & {
  image: string;
  username: string;
  size?: ProfileSize;
  alt: string;
};

export function UserAvatar({
  image,
  username,
  size = "w45",
  alt = "user avatar",
  className,
  ...props
}: UserAvatarProps) {
  const src = image ? tmdbImage.profile(image, size) : null;
  const initial = username ? username[0].toUpperCase() : "O";

  if (!src) {
    return (
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="grid size-full place-items-center font-bold">
          {initial}
        </div>
      </div>
    );
  }

  return (
    <div className="h-14 w-14 rounded-full bg-muted relative">
      <Image
        className={cn(
          "size-full rounded-full bg-muted object-cover",
          className
        )}
        src={src}
        alt={alt}
        unoptimized
        fill
      />
    </div>
  );
}
