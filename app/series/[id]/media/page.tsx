import { redirect } from "next/navigation";
type MediaProps = {
  params: { id: string };
};
export default async function Media({ params }: MediaProps) {
  const { id } = await params;
  redirect(`/series/${id}/media/posters`);
}
