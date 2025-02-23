"use client";

import Link from "next/link";
import { DetailedCollection } from "@/tmdb/models";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";
import { format } from "@/tmdb/utils";

interface MovieCollectionDialogProps {
  collection: DetailedCollection;
}

export const MovieCollectionDialog: React.FC<MovieCollectionDialogProps> = ({
  collection: { name, overview, parts },
}) => {
  return (
    <Dialog modal>
      <DialogTrigger className={buttonVariants()}>
        View The Collection
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-screen-lg"
      >
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="hidden text-muted-foreground md:block">
            {overview}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] md:pr-4">
          <div className="grid gap-4 md:grid-cols-2">
            {parts.map((part) => (
              <Link href={`/movies/${part.id}`} key={part.id}>
                <MediaCard.Root className="w-full aspect-video relative">
                  <MediaImages.Backdrop
                    image={part.backdrop_path}
                    alt=""
                    className="rounded-md "
                    priority
                  />
                  <MediaCard.Content>
                    <MediaCard.Title>
                      {part.title}{" "}
                      <span className="text-muted-foreground">
                        {" "}
                        {part.release_date
                          ? `(${format.year(part.release_date)})`
                          : ""}
                      </span>
                    </MediaCard.Title>
                    <MediaCard.Excerpt></MediaCard.Excerpt>
                  </MediaCard.Content>
                </MediaCard.Root>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
