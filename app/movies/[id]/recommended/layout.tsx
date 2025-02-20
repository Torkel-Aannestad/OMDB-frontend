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
  const { title, release_date, poster_path } = await tmdb.movie.details({
    id: id,
  });
  const year = format.year(release_date);

  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <MediaDetailsSubView.Top
        name={title}
        year={year.toString()}
        hrefBackLink={`/movies/${id}`}
        posterUrl={poster_path}
      />

      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
