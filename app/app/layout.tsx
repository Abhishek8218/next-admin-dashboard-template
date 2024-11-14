import { Layout } from "../../src/screens/layout";

export default function ChildLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}



