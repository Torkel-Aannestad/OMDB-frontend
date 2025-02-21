import { ContainerWithSpacing } from "@/components/container";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsLink, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils/format";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
