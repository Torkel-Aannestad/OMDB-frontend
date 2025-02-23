import { redirect } from "next/navigation";
type MediaProps = {
  params: Promise<{ id: string }>;
};
export default async function Media({ params }: MediaProps) {
  const { id } = await params;
  redirect(`/movies/${id}/media/posters`);
}
