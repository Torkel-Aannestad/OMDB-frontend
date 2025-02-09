"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Serie } from "@/tmdb/models";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/utils/tailwind";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MovieCard } from "./movie-card";
import { SerieCard } from "./serie-card";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

type CarouselProps = {
  title: string;
  link?: string;
  linkTitle?: string;
  size?: "small" | "medium";
  items: Serie[];
};

export function SerieRecommendedCarousel({
  title,
  link,
  linkTitle = "Explore more",
  size = "medium",
  items,
}: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }

  return (
    <Carousel
      opts={{ dragFree: true }}
      setApi={setApi}
      plugins={[WheelGesturesPlugin()]}
    >
      <div className="mb-4 flex items-center justify-between gap-4 md:justify-start">
        <h2 className="font-medium md:text-lg">{title}</h2>

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

      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className={cn(
              size === "small"
                ? "basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-[12%]"
                : "basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[16%]"
            )}
          >
            <SerieCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

type SerieCardWithNumberProps = Serie & {
  number: number;
};
function SerieCardWithNumber({
  id,
  poster_path,
  name,
  number,
}: SerieCardWithNumberProps) {
  return (
    <Link href={`/movie/${id}`} key={id} prefetch={false}>
      <MediaCard.Root className="grid grid-cols-[auto,1fr] ">
        <div>{number}</div>
        <MediaImages.Poster image={poster_path} alt={name} />
      </MediaCard.Root>
    </Link>
  );
}
