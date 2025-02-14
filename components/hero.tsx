"use client";

import { buttonVariants } from "./ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { tmdbImage } from "@/tmdb/utils";
import { cn } from "@/utils/tailwind";
import { Container } from "./container";
import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MovieWithMediaType, SerieWithMediaType } from "@/tmdb/models";
import { Icons } from "./icons";

type HeroProps = {
  trendingMedia: Array<MovieWithMediaType | SerieWithMediaType>;
};
export function Hero({ trendingMedia }: HeroProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  const trendingMediaSliced = trendingMedia.slice(0, 6);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }
  function setCurrentSlide(index: number) {
    api?.scrollTo(index, true);
  }

  return (
    <div>
      <Carousel
        opts={{ loop: true }}
        plugins={[WheelGesturesPlugin()]}
        setApi={setApi}
      >
        <CarouselContent className="h-[80vh] xl:h-[85vh] 2xl:h-[90vh]">
          {trendingMediaSliced.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className={cn(
                  "h-[85vh] xl:h-[85vh] 2xl:h-[90vh]  relative w-full -z-10 select-none",
                  "aspect-poster md:aspect-video"
                )}
              >
                {item.backdrop_path ? (
                  <Image
                    alt=""
                    className="size-full object-center object-cover rounded-none "
                    src={tmdbImage.backdrop(item.backdrop_path, "original")}
                    priority
                    fill
                  />
                ) : (
                  <div
                    className={cn("size-full bg-muted text-muted-foreground")}
                  >
                    <div className="flex items-center justify-center size-full">
                      <Icons.Logo className="size-12" />
                    </div>
                  </div>
                )}
                <div className={cn("overlay-hero-top rounded-none ")} />
                <div className={cn("overlay-hero-bottom ")} />
              </div>

              <Container className="-mt-[35vh] lg:-mt-[40vh] flex flex-col h-60 xl:h-64 2xl:h-80">
                <div className="grid md:grid-cols-[auto,1fr]">
                  <div className="max-w-2xl flex flex-col items-center lg:items-start">
                    <h1 className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      {item.media_type === "movie" ? item.title : item.name}
                    </h1>
                    <div className="mt-4 space-y-4 flex flex-col items-center lg:items-start">
                      <p className="space-y-4 text-center lg:text-start text-sm md:text-base xl:text-lg line-clamp-3 2xl:line-clamp-4">
                        {item.overview}
                      </p>
                      <Link
                        href={
                          item.media_type === "movie"
                            ? `/movies/${item.id}`
                            : `/series/${item.id}`
                        }
                        className={cn(buttonVariants())}
                      >
                        {item.media_type === "movie"
                          ? "Go to Movie"
                          : "Go to Series"}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-auto py-4 flex justify-center items-center">
                  <div className=" flex justify-center items-center gap-2">
                    {trendingMediaSliced.map((_, idx) => (
                      <div
                        key={idx}
                        className="p-1 cursor-pointer"
                        onClick={() => {
                          setCurrent(idx + 1);
                          setCurrentSlide(idx);
                        }}
                      >
                        <div
                          className={cn(
                            "rounded-full size-2 bg-neutral-700 ",
                            current === idx + 1 ? "bg-foreground" : ""
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
            "hover:bg-accent hover:text-accent-foreground",
            "absolute top-1/2 left-0 z-40 md:translate-x-4"
          )}
          onClick={previousSlide}
        >
          <ChevronLeft className="size-4 md:size-6 lg:size-8" />
        </button>
        <button
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
            "hover:bg-accent hover:text-accent-foreground",
            "absolute top-1/2 right-0 z-40 md:-translate-x-4"
          )}
          onClick={nextSlide}
        >
          <ChevronRight className="size-4 md:size-6 lg:size-8" />
        </button>
      </Carousel>
    </div>
  );
}
{
  /* <HeroInfo
                id={item.id}
                mediaType={item.media_type}
                title={item.title}
                name={item.name}
                overview={item.overview}
              /> */
}
// type HeroInfoProps = {
//   id: string | number;
//   mediaType: string;
//   title: string;
//   name: string;
//   overview: string;
// };
// function HeroInfo({ id, title, name, overview, mediaType }: HeroInfoProps) {
//   //mediatype:   person movie tv
//   return (
//     <Container className="-mt-[35vh]">
//       <div className="grid md:grid-cols-[auto,1fr] ">
//         <div className="max-w-2xl flex flex-col items-center lg:items-start">
//           <h1 className="text-3xl font-medium lg:text-4xl xl:text-5xl">
//             {mediaType === "movie" ? title : name}
//           </h1>
//           <div className="mt-4  space-y-4 flex flex-col items-center lg:items-start">
//             <p className="space-y-4 text-center lg:text-start text-sm md:text-base  xl:text-lg line-clamp-4">
//               {overview}
//             </p>
//             <Link href={`/movie/${id}`} className={cn(buttonVariants())}>
//               {mediaType === "movie" ? "Go to Movie" : "Go to Series"}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

// line-clamp-3 sm:line-clamp-4 h-16 sm:h-24
