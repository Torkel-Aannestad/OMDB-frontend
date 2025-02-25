import { redirect } from "next/navigation";
type MediaProps = {
  params: Promise<{ serieid: string }>;
};
export default async function Media({ params }: MediaProps) {
  const { serieid } = await params;
  redirect(`/series/${serieid}/media/posters`);
}
