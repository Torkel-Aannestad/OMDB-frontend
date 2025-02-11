import { MediaImages } from "./media-image";
import Link from "next/link";
import { cn } from "@/utils/tailwind";
import { buttonVariants } from "./ui/button";

type MediaSingleSectionProps = {
  link: string;
  backdropUrl: string;
  name: string;
  overview: string;
  mediaType: "movie" | "serie";
};
function MediaSingleSection({
  link,
  backdropUrl,
  name,
  overview,
  mediaType,
}: MediaSingleSectionProps) {
  return (
    <div>
      <div className="relative h-96 lg:h-[450px]">
        <MediaImages.Backdrop
          className="object-center rounded-md"
          image={backdropUrl}
          alt={name}
        />

        <div className="overlay">
          <div className="p-4 md:p-10">
            <h2 className="line-clamp-1 text-xl font-medium md:text-3xl">
              {name}
            </h2>
            <div className="mt-4 space-y-4 flex flex-col items-center lg:items-start">
              <p className="max-w-xl space-y-4 text-center lg:text-start text-sm md:text-base xl:text-lg line-clamp-3 2xl:line-clamp-4">
                {overview}
              </p>
              <Link href={link} className={cn(buttonVariants())}>
                {mediaType === "movie" ? "Go to Movie" : "Go to Series"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MediaSingleSection };
