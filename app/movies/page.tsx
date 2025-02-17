import { ContainerWithSpacing } from "@/components/container";
import { Hero } from "@/components/hero";
import { MediaCarousel } from "@/components/media-carousel";
import { MediaCategories } from "@/components/media-categories";
import { MediaSingleSection } from "@/components/media-section-view";
import { MovieCarousel } from "@/components/movie-carousel";
import { MovieTop10Carousel } from "@/components/movie-top10-carousel";
import { tmdb } from "@/tmdb/api";
import { getRandomCategory, movieCategories } from "@/tmdb/utils/categories";

export default async function Movies() {
  const trendingMovie = (await tmdb.trending.movies({ time: "day" })).results;
  const trendingMovieWeek = (await tmdb.trending.movies({ time: "week" }))
    .results;
  const popularMovie = (await tmdb.movie.list({ list: "popular" })).results;
  const moviesTop10 = trendingMovie.slice(0, 10);

  const MediaSingleSectionData = {
    name: trendingMovie[15].title,
    overview: trendingMovie[15].overview,
    backdrop: trendingMovie[15].backdrop_path
      ? trendingMovie[15].backdrop_path
      : "",
    link: `/movies/${trendingMovie[15].id}`,
  };
  const category1 = getRandomCategory(movieCategories);
  const category1Items = (
    await tmdb.discover.movie({ with_genres: category1.id.toString() })
  ).results.slice(0, 40);

  const category2 = getRandomCategory(movieCategories);
  const category2Items = (
    await tmdb.discover.movie({ with_genres: category2.id.toString() })
  ).results.slice(0, 25);

  const category3 = getRandomCategory(movieCategories);
  const category3Items = (
    await tmdb.discover.movie({ with_genres: category3.id.toString() })
  ).results.slice(0, 40);

  const MediaSingleSectionData2 = {
    name: trendingMovie[16].title,
    overview: trendingMovie[16].overview,
    backdrop: trendingMovie[16].backdrop_path
      ? trendingMovie[16].backdrop_path
      : "",
    link: `/movies/${trendingMovie[16].id}`,
  };

  const category4 = getRandomCategory(movieCategories);
  const category4Items = (
    await tmdb.discover.movie({ with_genres: category4.id.toString() })
  ).results.slice(0, 25);

  return (
    <>
      <Hero items={trendingMovieWeek} startIndex={3} />

      <ContainerWithSpacing>
        <MovieCarousel
          title={"Popular Now"}
          link="/movies/popular"
          linkTitle={`More Popular movies`}
          items={popularMovie}
        />

        <MovieCarousel
          title={`${category1.name}`}
          link={`/movies/categories?with_genres=${category1.id}`}
          linkTitle={`More ${category1.name} Movies`}
          items={category1Items}
          size="small"
        />
        <MediaCategories title="Movies by Categories" media_type="movie" />
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
        <MovieCarousel
          title={`${category2.name}`}
          link={`/movies/categories?with_genres=${category2.id}`}
          linkTitle={`More ${category2.name} Movies`}
          items={category2Items}
          size="medium"
        />
        <MovieCarousel
          title={`${category3.name}`}
          link={`/movies/categories?with_genres=${category3.id}`}
          linkTitle={`More ${category3.name} Movies`}
          items={category3Items}
          size="small"
        />
        <MediaSingleSection
          backdropUrl={MediaSingleSectionData2.backdrop}
          name={MediaSingleSectionData2.name}
          overview={MediaSingleSectionData2.overview}
          link={MediaSingleSectionData2.link}
          mediaType="movie"
        />
        <MovieCarousel
          title={`${category4.name}`}
          link={`/movies/categories?with_genres=${category4.id}`}
          linkTitle={`More ${category4.name} Movies`}
          items={category4Items}
          size="medium"
        />
      </ContainerWithSpacing>
    </>
  );
}
