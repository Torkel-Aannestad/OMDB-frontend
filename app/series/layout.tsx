import { Container } from "@/components/container";

type SerieLayoutProps = {
  children: React.ReactNode;
};

export default function SerieLayout({ children }: SerieLayoutProps) {
  return <Container className="mt-28 md:mt-32">{children}</Container>;
}
