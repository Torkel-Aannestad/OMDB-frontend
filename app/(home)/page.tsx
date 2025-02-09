import { Hero } from "@/components/hero";
import { tmdb } from "@/tmdb/api";
import Image from "next/image";

export default async function Home() {
  const trending = (await tmdb.trending.overall({ time: "day" })).results;
  const trendingMovie = (await tmdb.trending.movies({ time: "day" })).results;

  return (
    <>
      <Hero trendingMedia={trending} />
      <div className="h-56 bg-neutral-800 w-full"> Recommended for You</div>
    </>
  );
}

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//   <Hero trendingMedia={trending} />
//   </main>
// </div>
