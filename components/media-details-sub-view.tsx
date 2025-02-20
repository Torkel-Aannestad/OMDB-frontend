import Link from "next/link";
import { MediaImages } from "./media-image";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/utils/tailwind";
import { ArrowLeft } from "lucide-react";

type TopProps = {
  name: string;
  year: string;
  hrefBackLink: string;
  posterUrl: string;
};
function Top({ name, year, hrefBackLink, posterUrl }: TopProps) {
  return (
    <div className="flex gap-4">
      <div className="relative h-28 aspect-poster">
        <MediaImages.Poster image={posterUrl} alt={`${name} poster`} />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <h2 className="text-2xl font-medium xl:text-4xl">
          {name}{" "}
          <span className="font-light text-muted-foreground">({year})</span>
        </h2>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "self-start")}
          href={hrefBackLink}
        >
          <ArrowLeft className="inline-flex" /> Back to main
        </Link>
      </div>
    </div>
  );
}

export const MediaDetailsSubView = {
  Top,
};
