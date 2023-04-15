import TopNav from "@/components/TopNav";

export default function FileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full">
      <TopNav />
      {children}
    </section>
  );
}
