import { ContainerWithSpacing } from "@/components/container";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsLink, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils/format";

type LayoutProps = {
  params: { serieid: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
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

      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
