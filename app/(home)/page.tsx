import { ContainerWithSpacing } from "@/components/container";
import { Hero } from "@/components/hero";
import { MediaSingleSection } from "@/components/media-section-view";
import { MovieTop10Carousel } from "@/components/movie-top10-carousel";
import { SerieTop10Carousel } from "@/components/serie-top10-carousel";
import { tmdb } from "@/tmdb/api";

export default async function Home() {
  const trending = (
    await tmdb.trending.overall({ time: "day" })
  ).results.filter((item) => item.media_type !== "person");

  const trendingMovie = (await tmdb.trending.movies({ time: "day" })).results;
  const moviesTop10 = trendingMovie.slice(0, 10);

  const trendingSeries = (await tmdb.trending.series({ time: "day" })).results;
  const seriesTop10 = trendingSeries.slice(0, 10);
  const MediaSingleSectionData = {
    name: trendingMovie[15].title,
    overview: trendingMovie[15].overview,
    backdrop: trendingMovie[15].backdrop_path
      ? trendingMovie[15].backdrop_path
      : "",
    link: `/movie/${trendingMovie[15].id}`,
  };

  return (
    <>
      <Hero trendingMedia={trending} />
      <ContainerWithSpacing>
        <div className="h-56 bg-neutral-800 w-full"> Categori</div>
      </ContainerWithSpacing>
      <ContainerWithSpacing className="mt-8 md:mt-16 xl:mt-24">
        <SerieTop10Carousel items={seriesTop10} />
      </ContainerWithSpacing>
      <ContainerWithSpacing>
        <MediaSingleSection
          backdropUrl={MediaSingleSectionData.backdrop}
          name={MediaSingleSectionData.name}
          overview={MediaSingleSectionData.overview}
          link={MediaSingleSectionData.link}
          mediaType="movie"
        />
      </ContainerWithSpacing>
      <ContainerWithSpacing className="mt-8 md:mt-16 xl:mt-24">
        <MovieTop10Carousel items={moviesTop10} />
      </ContainerWithSpacing>
    </>
  );
}
