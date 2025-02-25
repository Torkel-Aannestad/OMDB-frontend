"use client";

import { useState } from "react";
import Link from "next/link";
import type { Movie } from "@/tmdb/models";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MediaCard } from "./media-card";
import { MediaImages } from "./media-image";

type CarouselProps = {
  items: Movie[];
};

export function MovieTop10Carousel({ items }: CarouselProps) {
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
        <h2 className="font-bold flex items-center py-4">
          <span className="text-4xl md:text-6xl pr-3 lg:pr-4">Top 10</span>
          <span className="text-xl md:text-3xl flex flex-col">
            <span>Movies</span>
            <span>Today</span>
          </span>
        </h2>

        <div className="ml-auto hidden self-end items-center gap-2 md:flex">
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
        {items.map((item, idx) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2  lg:basis-1/3 xl:basis-[20%]"
          >
            <MovieCardWithNumber number={idx + 1} {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

type MovieCardWithNumberProps = Movie & {
  number: number;
};
function MovieCardWithNumber({
  id,
  poster_path,
  title,
  number,
}: MovieCardWithNumberProps) {
  return (
    <Link href={`/movies/${id}`} key={id} prefetch={false} className="group">
      <div className="grid grid-cols-[auto,1fr]">
        <div className="w-16 flex items-end font-bold text-8xl text-muted-foreground ">
          <span
            className={cn(
              "group-hover:scale-105 translate-x-4 group-hover:translate-x-2 group-hover:text-foreground transition duration-300"
            )}
          >
            {number}
          </span>
        </div>
        <MediaCard.Root className={cn(number === 10 && "-z-10")}>
          <MediaImages.Poster image={poster_path} alt={title} />
        </MediaCard.Root>
      </div>
    </Link>
  );
}
