"use client";

import React, { ComponentProps, useState } from "react";
import Link from "next/link";
import type { Image, Video } from "@/tmdb/models";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
            <EmptyState text="No posters to show" />
          )
        ) : currentType === "backdrops" ? (
          backdropsSliced.length > 0 ? (
            <BackdropsCarousel backdrops={backdropsSliced} />
          ) : (
            <EmptyState text="No backdrops to show" />
          )
        ) : videosSliced.length > 0 ? (
          <VideosCarousel videos={videosSliced} />
        ) : (
          <EmptyState text="No videos to show" />
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
          <Link href={`/`}>
            <MediaCard.Root className="w-full aspect-video">
              <VideoCard name={video.name} ytKey={video.key} />
            </MediaCard.Root>
          </Link>
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
          <PosterCard filePath={image.file_path} />
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
          <BackdropCard filePath={image.file_path} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

type ImageCardProps = ComponentProps<"div"> & {
  filePath: string;
};
function PosterCard({ filePath, className, ...props }: ImageCardProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Link href={`/`} key={filePath}>
        <MediaCard.Root>
          <MediaImages.Poster image={filePath} alt="Poster image" />
        </MediaCard.Root>
      </Link>
    </div>
  );
}

function BackdropCard({ filePath, className, ...props }: ImageCardProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Link href={`/`} className={cn("", className)}>
        <MediaCard.Root className="w-full aspect-video">
          <MediaImages.BackDrop
            image={filePath}
            className="rounded-md"
            alt="Backdrop image"
          />
        </MediaCard.Root>
      </Link>
    </div>
  );
}

type EmptyStateProps = ComponentProps<"div"> & {
  text: string;
};
function EmptyState({
  text = "No Records to show",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn("", className)} {...props}>
      <MediaCard.Root
        className={cn(
          "h-56 w-full rounded-md border bg-muted  ",
          "bg-gradient-to-tr from-background/25"
        )}
      >
        <div className="flex items-center justify-center gap-2 size-full text-muted-foreground">
          {text}
        </div>
      </MediaCard.Root>
    </div>
  );
}
