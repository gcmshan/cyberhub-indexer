import AllInOneSearch from "@/components/AllInOneSearch";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const query = decodeURIComponent(rawSlug).replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-10">
      <AllInOneSearch defaultQuery={query} />
    </main>
  );
}