import { ContainerWithSpacing } from "@/components/container";
import { Hero } from "@/components/hero";
import { MediaCategories } from "@/components/media-categories";
import { MediaSingleSection } from "@/components/media-section-view";
import { SerieCarousel } from "@/components/serie-carousel";
import { SerieTop10Carousel } from "@/components/serie-top10-carousel";
import { tmdb } from "@/tmdb/api";
import { getRandomCategory, serieCategories } from "@/tmdb/utils/categories";

export default async function Series() {
  const trendingSerie = (await tmdb.trending.series({ time: "day" })).results;
  const trendingSerieWeek = (await tmdb.trending.series({ time: "week" }))
    .results;
  const popularSeries = (await tmdb.series.list({ list: "popular" })).results;
  const seriesTop10 = trendingSerie.slice(0, 10);

  const MediaSingleSectionData = {
    name: trendingSerie[15].name,
    overview: trendingSerie[15].overview,
    backdrop: trendingSerie[15].backdrop_path
      ? trendingSerie[15].backdrop_path
      : "",
    link: `/series/${trendingSerie[15].id}`,
  };
  const category1 = getRandomCategory(serieCategories);
  const category1Items = (
    await tmdb.discover.serie({ with_genres: category1.id.toString() })
  ).results.slice(0, 40);

  const category2 = getRandomCategory(serieCategories);
  const category2Items = (
    await tmdb.discover.serie({ with_genres: category2.id.toString() })
  ).results.slice(0, 25);

  const category3 = getRandomCategory(serieCategories);
  const category3Items = (
    await tmdb.discover.serie({ with_genres: category3.id.toString() })
  ).results.slice(0, 40);

  const MediaSingleSectionData2 = {
    name: trendingSerie[16].name,
    overview: trendingSerie[16].overview,
    backdrop: trendingSerie[16].backdrop_path
      ? trendingSerie[16].backdrop_path
      : "",
    link: `/series/${trendingSerie[16].id}`,
  };

  const category4 = getRandomCategory(serieCategories);
  const category4Items = (
    await tmdb.discover.serie({ with_genres: category4.id.toString() })
  ).results.slice(0, 25);

  return (
    <>
      <Hero items={trendingSerieWeek} startIndex={3} />

      <ContainerWithSpacing>
        <SerieCarousel
          title={"Popular Now"}
          link="/series/popular"
          linkTitle={`More Popular Series`}
          items={popularSeries}
        />

        <SerieCarousel
          title={`${category1.name}`}
          link={`/series/categories?with_genres=${category1.id}`}
          linkTitle={`More ${category1.name} Series`}
          items={category1Items}
          size="small"
        />
        <MediaCategories title="Series by Categories" media_type="serie" />
        <MediaSingleSection
          backdropUrl={MediaSingleSectionData.backdrop}
          name={MediaSingleSectionData.name}
          overview={MediaSingleSectionData.overview}
          link={MediaSingleSectionData.link}
          mediaType="serie"
        />
      </ContainerWithSpacing>
      <ContainerWithSpacing className="mt-8 md:mt-16 xl:mt-24">
        <SerieTop10Carousel items={seriesTop10} />
        <SerieCarousel
          title={`${category2.name}`}
          link={`/series/categories?with_genres=${category2.id}`}
          linkTitle={`More ${category2.name} Series`}
          items={category2Items}
          size="medium"
        />
        <SerieCarousel
          title={`${category3.name}`}
          link={`/series/categories?with_genres=${category3.id}`}
          linkTitle={`More ${category3.name} Series`}
          items={category3Items}
          size="small"
        />
        <MediaSingleSection
          backdropUrl={MediaSingleSectionData2.backdrop}
          name={MediaSingleSectionData2.name}
          overview={MediaSingleSectionData2.overview}
          link={MediaSingleSectionData2.link}
          mediaType="serie"
        />
        <SerieCarousel
          title={`${category4.name}`}
          link={`/series/categories?with_genres=${category4.id}`}
          linkTitle={`More ${category4.name} Series`}
          items={category4Items}
          size="medium"
        />
      </ContainerWithSpacing>
    </>
  );
}
