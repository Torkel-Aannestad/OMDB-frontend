import { ContainerWithSpacing } from "@/components/container";
import { Hero } from "@/components/hero";
import { MediaCarousel } from "@/components/media-carousel";
import { MediaSingleSection } from "@/components/media-section-view";
import { MovieCarousel } from "@/components/movie-carousel";
import { MovieTop10Carousel } from "@/components/movie-top10-carousel";
import { SerieCarousel } from "@/components/serie-carousel";
import { SerieTop10Carousel } from "@/components/serie-top10-carousel";
import { tmdb } from "@/tmdb/api";
import {
  getRandomCategory,
  movieCategories,
  serieCategories,
} from "@/tmdb/utils/categories";

export default async function Home() {
  const trending = (
    await tmdb.trending.overall({ time: "day" })
  ).results.filter((item) => item.media_type !== "person");

  const popularMovie = (await tmdb.movie.list({ list: "popular" })).results;

  const trendingMovie = (await tmdb.trending.movies({ time: "day" })).results;
  const moviesTop10 = trendingMovie.slice(0, 10);
  // const trendingMovieWeek = (await tmdb.trending.movies({ time: "week" }))
  //   .results;

  const trendingSeries = (await tmdb.trending.series({ time: "day" })).results;
  const seriesTop10 = trendingSeries.slice(0, 10);

  //Singel Section Movie
  const SingelSectionMovie1 = {
    name: trendingMovie[15].title,
    overview: trendingMovie[15].overview,
    backdrop: trendingMovie[15].backdrop_path
      ? trendingMovie[15].backdrop_path
      : "",
    link: `/movie/${trendingMovie[15].id}`,
  };
  const SingelSectionMovie2 = {
    name: trendingMovie[16].title,
    overview: trendingMovie[16].overview,
    backdrop: trendingMovie[16].backdrop_path
      ? trendingMovie[16].backdrop_path
      : "",
    link: `/movie/${trendingMovie[16].id}`,
  };

  //Singel Section Serie
  const SingelSectionSerie1 = {
    name: trendingSeries[15].name,
    overview: trendingSeries[15].overview,
    backdrop: trendingSeries[15].backdrop_path
      ? trendingSeries[15].backdrop_path
      : "",
    link: `/movie/${trendingSeries[15].id}`,
  };

  //Category Movie
  const categoryMovie1 = getRandomCategory(movieCategories);
  const categoryMovie1Items = (
    await tmdb.discover.movie({ with_genres: categoryMovie1.id.toString() })
  ).results.slice(0, 40);

  const categoryMovie2 = getRandomCategory(movieCategories);
  const categoryMovie2Items = (
    await tmdb.discover.movie({ with_genres: categoryMovie2.id.toString() })
  ).results.slice(0, 25);

  const categoryMovie3 = getRandomCategory(movieCategories);
  const categoryMovie3Items = (
    await tmdb.discover.movie({ with_genres: categoryMovie3.id.toString() })
  ).results.slice(0, 40);

  //Category Series
  const categorySerie1 = getRandomCategory(serieCategories);
  const categorySerie1Items = (
    await tmdb.discover.serie({ with_genres: categorySerie1.id.toString() })
  ).results.slice(0, 40);

  const categorySerie2 = getRandomCategory(serieCategories);
  const categorySerie2Items = (
    await tmdb.discover.serie({ with_genres: categorySerie2.id.toString() })
  ).results.slice(0, 25);

  const categorySerie3 = getRandomCategory(serieCategories);
  const categorySerie3Items = (
    await tmdb.discover.serie({ with_genres: categorySerie3.id.toString() })
  ).results.slice(0, 40);

  const categorySerie4 = getRandomCategory(serieCategories);
  const categorySerie4Items = (
    await tmdb.discover.serie({ with_genres: categorySerie4.id.toString() })
  ).results.slice(0, 40);
  return (
    <>
      <Hero items={trending} startIndex={0} />
      <ContainerWithSpacing>
        <MovieCarousel
          items={popularMovie}
          title={"Popular Movies"}
          link="/movies/popular"
          linkTitle="All Popular Movies"
        />
        <MovieCarousel
          title={`${categoryMovie1.name}`}
          link={`/movies/categories?with_genres=${categoryMovie1.id}`}
          linkTitle={`More ${categoryMovie1.name} Movies`}
          items={categoryMovie1Items}
          size="small"
        />
        <MediaSingleSection
          backdropUrl={SingelSectionMovie1.backdrop}
          name={SingelSectionMovie1.name}
          overview={SingelSectionMovie1.overview}
          link={SingelSectionMovie1.link}
          mediaType="movie"
        />
      </ContainerWithSpacing>
      <ContainerWithSpacing className="mt-8 md:mt-16 xl:mt-24">
        <SerieTop10Carousel items={seriesTop10} />
        <SerieCarousel
          title={`${categorySerie1.name}`}
          items={categorySerie1Items}
          link={`/series/categories?with_genres=${categorySerie1.id}`}
          linkTitle={`More ${categorySerie1.name} Series`}
        />
        <SerieCarousel
          title={`${categorySerie2.name}`}
          items={categorySerie2Items}
          link={`/series/categories?with_genres=${categorySerie2.id}`}
          linkTitle={`More ${categorySerie2.name} Series`}
          size="small"
        />
        <MediaSingleSection
          backdropUrl={SingelSectionSerie1.backdrop}
          name={SingelSectionSerie1.name}
          overview={SingelSectionSerie1.overview}
          link={SingelSectionSerie1.link}
          mediaType="serie"
        />
      </ContainerWithSpacing>
      <ContainerWithSpacing className="mt-8 md:mt-16 xl:mt-24">
        <MovieTop10Carousel items={moviesTop10} />
        <MovieCarousel
          title={`${categoryMovie2.name}`}
          link={`/movies/categories?with_genres=${categoryMovie2.id}`}
          linkTitle={`More ${categoryMovie2.name} Movies`}
          items={categoryMovie2Items}
        />
        <MovieCarousel
          title={`${categoryMovie3.name}`}
          link={`/movies/categories?with_genres=${categoryMovie3.id}`}
          linkTitle={`More ${categoryMovie3.name} Movies`}
          items={categoryMovie3Items}
          size="small"
        />
        <MediaSingleSection
          backdropUrl={SingelSectionMovie2.backdrop}
          name={SingelSectionMovie2.name}
          overview={SingelSectionMovie2.overview}
          link={SingelSectionMovie2.link}
          mediaType="movie"
        />
        <SerieCarousel
          title={`${categorySerie3.name}`}
          items={categorySerie3Items}
          link={`/series/categories?with_genres=${categorySerie3.id}`}
          linkTitle={`More ${categorySerie3.name} Series`}
        />
        <SerieCarousel
          title={`${categorySerie4.name}`}
          items={categorySerie4Items}
          link={`/series/categories?with_genres=${categorySerie4.id}`}
          linkTitle={`More ${categorySerie4.name} Series`}
          size="small"
        />
      </ContainerWithSpacing>
    </>
  );
}
