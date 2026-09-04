import { Metadata } from "next";
import AllInOneSearch from "@/components/AllInOneSearch";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Google Search Indexing Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = decodeURIComponent(slug).replace(/-/g, " ");

  return {
    title: `Download ${query} Repack - CyberHub Games`,
    description: `Get fast, direct repack search results for ${query} on CyberHub Games.`,
    openGraph: {
      title: `Download ${query} Repack - CyberHub Games`,
      description: `Find trusted repack download links and details for ${query}.`,
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const query = decodeURIComponent(rawSlug).replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-10">
      <AllInOneSearch />
    </main>
  );
}