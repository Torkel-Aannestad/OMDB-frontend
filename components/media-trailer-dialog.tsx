import { Video } from "@/tmdb/models";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/utils/tailwind";
import { buttonVariants } from "./ui/button";
import { Play } from "lucide-react";
import { yt } from "@/tmdb/utils/youtube";

type MediaTrailerDialogProps = {
  videos: Video[];
};
export function MediaTrailerDialog({ videos }: MediaTrailerDialogProps) {
  const trailer = videos.find((video) => video.type == "Trailer");

  return (
    <Dialog modal>
      <DialogTrigger className={cn(buttonVariants())} disabled={!trailer}>
        <Play className="mr-2 size-4" /> Watch Trailer
      </DialogTrigger>
      {trailer && (
        <DialogContent className="max-w-screen-lg">
          <DialogTitle>{trailer.name}</DialogTitle>
          <iframe
            className="aspect-square sm:aspect-video size-full rounded-md"
            src={yt.video(trailer.key, false)}
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
