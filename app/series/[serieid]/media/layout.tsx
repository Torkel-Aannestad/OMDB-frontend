import { ContainerWithSpacing } from "@/components/container";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { Tabs, TabsLink, TabsList } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils/format";

type SeriesLayoutProps = {
  params: Promise<{ serieid: string }>;
  children: React.ReactNode;
};

export default async function Layout({ params, children }: SeriesLayoutProps) {
  const { serieid } = await params;
  const { name, first_air_date, poster_path } = await tmdb.series.details({
    id: serieid,
  });
  const year = format.year(first_air_date);

  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <MediaDetailsSubView.Top
        name={name}
        year={year.toString()}
        hrefBackLink={`/series/${serieid}`}
        posterUrl={poster_path}
      />
      <Tabs>
        <TabsList>
          <TabsLink href={`/series/${serieid}/media/videos`}>Videos</TabsLink>
          <TabsLink href={`/series/${serieid}/media/posters`}>Posters</TabsLink>
          <TabsLink href={`/series/${serieid}/media/backdrops`}>
            Backdrops
          </TabsLink>
        </TabsList>
      </Tabs>

      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
