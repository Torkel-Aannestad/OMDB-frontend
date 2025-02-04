"use client";

import React, { ComponentProps, useState } from "react";
import Link from "next/link";
import type { Image, Video } from "@/tmdb/models";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";

import { cn } from "@/utils/tailwind";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";
import { VideoCard } from "./video-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { yt } from "@/tmdb/utils/youtube";
import NextImage from "next/image";
import { tmdbImage } from "@/tmdb/utils";
import { EmptyStateCard } from "./empty-state-card";

type CarouselProps = {
  title: string;
  link?: string;
  linkTitle?: string;
  videos: Video[];
  posters: Image[];
  backdrops: Image[];
};

export function VideoImageCarousel({
  title,
  link,
  linkTitle = "Explore more",
  videos,
  posters,
  backdrops,
}: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentType, setCurrentType] = useState<
    "videos" | "posters" | "backdrops"
  >("videos");
  const videosSliced = videos.slice(0, 20);
  const postersSliced = posters.slice(0, 20);
  const backdropsSliced = backdrops.slice(0, 20);

  const videosNumber = videos.length;
  const postersNumber = posters.length;
  const backdropsNumber = backdrops.length;

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }

  return (
    <Carousel opts={{ dragFree: true }} setApi={setApi}>
      <h2 className="font-medium md:text-lg">{title}</h2>
      <div className=" my-4 flex items-center justify-between gap-4 md:justify-start">
        <Tabs>
          <TabsList>
            <TabsTrigger
              value={"videos"}
              data-state={currentType === "videos" ? "active" : ""}
              onClick={() => {
                setCurrentType("videos");
              }}
            >
              Videos ({videosNumber})
            </TabsTrigger>
            <TabsTrigger
              value={"posters"}
              onClick={() => {
                setCurrentType("posters");
              }}
            >
              Posters ({postersNumber})
            </TabsTrigger>
            <TabsTrigger
              value={"backdrops"}
              onClick={() => {
                setCurrentType("backdrops");
              }}
            >
              Backdrops ({backdropsNumber})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {link && (
          <Link
            href={link}
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "text-xs"
            )}
          >
            {linkTitle}
          </Link>
        )}

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button onClick={previousSlide} size="sm" variant="outline">
            <ArrowLeft className="size-3" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button onClick={nextSlide} size="sm" variant="outline">
            <ArrowRight className="size-3" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
      <div>
        {currentType === "posters" ? (
          postersSliced.length > 0 ? (
            <PostersCarousel posters={postersSliced} />
          ) : (
            <EmptyStateCard text="Currently no posters" />
          )
        ) : currentType === "backdrops" ? (
          backdropsSliced.length > 0 ? (
            <BackdropsCarousel backdrops={backdropsSliced} />
          ) : (
            <EmptyStateCard text="Currently no  backdrops" />
          )
        ) : videosSliced.length > 0 ? (
          <VideosCarousel videos={videosSliced} />
        ) : (
          <EmptyStateCard text="Currently no videos" />
        )}
      </div>
    </Carousel>
  );
}

type VideosCarouselProps = {
  videos: Video[];
};
function VideosCarousel({ videos }: VideosCarouselProps) {
  return (
    <CarouselContent>
      {videos.map((video) => (
        <CarouselItem
          key={video.id}
          className="basis-full lg:basis-[48%] xl:basis-[40%]"
        >
          <Dialog key={video.id} modal>
            <DialogTrigger asChild>
              <MediaCard.Root className="w-full aspect-video">
                <VideoCard name={video.name} ytKey={video.key} />
              </MediaCard.Root>
            </DialogTrigger>

            <DialogContent className="max-w-screen-lg">
              <DialogHeader>
                <DialogTitle>{video.name}</DialogTitle>
              </DialogHeader>

              <iframe
                className="aspect-square size-full rounded-md sm:aspect-video"
                src={yt.video(video.key, false)}
                allow="autoplay; encrypted-media"
                allowFullScreen={true}
              />
            </DialogContent>
          </Dialog>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

type PostersCarouselProps = {
  posters: Image[];
};
function PostersCarousel({ posters }: PostersCarouselProps) {
  return (
    <CarouselContent>
      {posters.map((image) => (
        <CarouselItem
          key={image.file_path}
          className="basis-1/2 md:basis-1/3 lg:basis-[22%] xl:basis-[16%]"
        >
          <PosterCardDialogExpand filePath={image.file_path} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

type BackdropsCarouselProps = {
  backdrops: Image[];
};
function BackdropsCarousel({ backdrops }: BackdropsCarouselProps) {
  return (
    <CarouselContent>
      {backdrops.map((image) => (
        <CarouselItem
          key={image.file_path}
          className="basis-full lg:basis-[48%] xl:basis-[40%]"
        >
          <BackdropCardDialogExpand filePath={image.file_path} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

type ImageCardProps = ComponentProps<"div"> & {
  filePath: string;
};
function PosterCardDialogExpand({
  filePath,
  className,
  ...props
}: ImageCardProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Dialog modal>
        <MediaCard.Root>
          <DialogTrigger className="transition group">
            <MediaImages.Poster image={filePath} alt="Poster image" />
            <div className="overlay grid place-items-center opacity-0 transition duration-300 group-hover:opacity-100">
              <Expand className="transition duration-500 stroke-secondary-foreground " />
            </div>
          </DialogTrigger>
        </MediaCard.Root>
        <DialogContent className="aspect-poster">
          <DialogHeader>
            <DialogTitle className="font-light text-sm">{"Poster"}</DialogTitle>
          </DialogHeader>
          <div className="aspect-poster relative ">
            <NextImage
              src={tmdbImage.backdrop(filePath, "w780")}
              alt={filePath}
              className="rounded-md border bg-muted"
              unoptimized
              fill
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BackdropCardDialogExpand({
  filePath,
  className,
  ...props
}: ImageCardProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Dialog modal>
        <MediaCard.Root className="w-full aspect-video">
          <DialogTrigger className="transition group">
            <MediaImages.Backdrop
              image={filePath}
              className="rounded-md"
              alt="Backdrop image"
            />
            <div className="overlay grid place-items-center opacity-0 transition duration-300 group-hover:opacity-100">
              <Expand className="transition duration-500 stroke-secondary-foreground " />
            </div>
          </DialogTrigger>
        </MediaCard.Root>
        <DialogContent className="aspect-video max-w-screen-xl">
          <DialogHeader>
            <DialogTitle className="font-light text-sm">
              {"Backdrop"}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video relative ">
            <NextImage
              src={tmdbImage.backdrop(filePath, "original")}
              alt={filePath}
              className="rounded-md border bg-muted"
              unoptimized
              fill
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// function PosterCard({ filePath, className, ...props }: ImageCardProps) {
//   return (
//     <div className={cn("", className)} {...props}>
//       <Link href={`/`} key={filePath}>
//         <MediaCard.Root>
//           <MediaImages.Poster image={filePath} alt="Poster image" />
//         </MediaCard.Root>
//       </Link>
//     </div>
//   );
// }

// function BackdropCard({ filePath, className, ...props }: ImageCardProps) {
//   return (
//     <div className={cn("", className)} {...props}>
//       <Link href={`/`} className={cn("", className)}>
//         <MediaCard.Root className="w-full aspect-video">
//           <MediaImages.BackDrop
//             image={filePath}
//             className="rounded-md"
//             alt="Backdrop image"
//           />
//         </MediaCard.Root>
//       </Link>
//     </div>
//   );
// }
