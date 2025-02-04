import { ComponentProps, TdHTMLAttributes } from "react";
import { MediaImages } from "./media-image";
import { tmdb } from "@/tmdb/api";

type MovieCollectionProps = {
  id: string | number;
};
export function MovieCollection({ id }: MovieCollectionProps) {
  const collection = tmdb..details({ id: id });
  
  return (
    <div>
      <MediaImages.BackDrop alt="" image="" />
    </div>
  );
}
