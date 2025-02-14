import { Container } from "@/components/container";

type MovieLayoutProps = {
  children: React.ReactNode;
};

export default function MovieLayout({ children }: MovieLayoutProps) {
  return <Container className="mt-28 md:mt-32">{children}</Container>;
}
