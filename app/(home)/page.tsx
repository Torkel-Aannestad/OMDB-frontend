import { ContainerWithSpacing } from "@/components/container";
import { Hero } from "@/components/hero";
import { MovieTop10Carousel } from "@/components/movie-top10-carousel";
import { SerieTop10Carousel } from "@/components/serie-top10-carousel";
import { tmdb } from "@/tmdb/api";
import Image from "next/image";

export default async function Home() {
  const trending = (await tmdb.trending.overall({ time: "day" })).results;

  const trendingMovie = (await tmdb.trending.movies({ time: "day" })).results;
  const moviesTop10 = trendingMovie.slice(0, 10);

  const trendingSeries = (await tmdb.trending.series({ time: "day" })).results;
  const seriesTop10 = trendingSeries.slice(0, 10);
  return (
    <>
      <Hero trendingMedia={trending} />
      <ContainerWithSpacing>
        <div className="h-56 bg-neutral-800 w-full"> Recommended for You</div>
        <SerieTop10Carousel items={seriesTop10} />
        <MovieTop10Carousel items={moviesTop10} />
      </ContainerWithSpacing>
    </>
  );
}

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//   <Hero trendingMedia={trending} />
//   </main>
// </div>
