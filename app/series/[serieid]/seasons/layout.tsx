import { ContainerWithSpacing } from "@/components/container";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <ContainerWithSpacing className="mt-28 md:mt-32 lg:mt-32 xl:mt-32">
      <div>{children}</div>
    </ContainerWithSpacing>
  );
}
