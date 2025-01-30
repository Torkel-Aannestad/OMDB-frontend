import { tmdb } from "@/tmdb/api";
import Image from "next/image";

interface DetailProps {
  params: {
    id: string;
  };
}
export default async function Details({ params }: DetailProps) {
  const { id, title, poster_path } = await tmdb.movie.details({
    id: params.id,
  });
  return (
    <>
      <h1>This is the id: ${params.id}</h1>
      <p>{`the id: ${id}`}</p>
      <p>{`title: ${title}`}</p>
    </>
  );
}
