import { CastCard } from "@/components/cast-card";
import { CrewCard } from "@/components/crew-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Credits({ params }: Props) {
  const { id } = await params;

  const { cast, crew } = await tmdb.movie.credits({
    id: id,
  });

  return (
    <div className="space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="text-2xl font-medium">Cast & Crew</h1>
      </div>

      <Tabs defaultValue="cast">
        <TabsList>
          <TabsTrigger value="cast" disabled={cast?.length < 1 && true}>
            Cast
            <span className="pl-1 text-muted-foreground">
              {` (${cast?.length})`}
            </span>
          </TabsTrigger>

          <TabsTrigger value="crew" disabled={crew?.length < 1 && true}>
            Crew
            <span className="pl-1 text-muted-foreground">
              {` (${crew?.length})`}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cast">
          {cast?.length ? (
            <div className="grid-list">
              {cast.map((cast) => (
                <CastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No cast</div>
          )}
        </TabsContent>

        <TabsContent value="crew">
          {crew?.length ? (
            <div className="grid-list">
              {crew.map((crew) => (
                <CrewCard key={crew.credit_id} {...crew} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No crew</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
