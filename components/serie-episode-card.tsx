import { Episode } from "@/tmdb/models";
import { format } from "@/tmdb/utils";
import { Calendar, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MediaImages } from "@/components/media-image";
import { MediaRating } from "@/components/media-rating";

export function SerieEpisodeCard({
  id,
  name,
  episode_number,
  still_path,
  vote_average,
  vote_count,
  air_date,
  overview,
  runtime,
}: Episode) {
  return (
    <div className="flex flex-col rounded-md border">
      <div className="relative aspect-video" key={id}>
        <MediaImages.Backdrop
          image={still_path}
          alt={name}
          size="w780"
          className="rounded-b-none rounded-t-md border-x-0 border-b border-t-0"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex items-center gap-2 font-medium">
          {episode_number}. {name}
        </h3>

        <div className="mb-4 mt-1 line-clamp-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {overview}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <MediaRating average={vote_average} count={vote_count} />

          <Badge variant="outline" className="hover:border-secondary">
            <Clock className="inline size-3" />
            <span className="ml-2">{format.runtime(runtime)}</span>
          </Badge>

          <Badge variant="outline" className="hover:border-secondary">
            <Calendar className="inline size-3" />
            <span className="ml-2">{format.date(air_date)}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}
