import { ContainerWithSpacing } from "@/components/container";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsLink, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils/format";

type LayoutProps = {
  params: { id: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  const { id } = await params;
  const { name, first_air_date, poster_path } = await tmdb.series.details({
    id: id,
  });
  const year = format.year(first_air_date);

  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <MediaDetailsSubView.Top
        name={name}
        year={year.toString()}
        hrefBackLink={`/series/${id}`}
        posterUrl={poster_path}
      />

      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
