import { Metadata } from "next";
import AllInOneSearch from "@/components/AllInOneSearch";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Static Export සඳහා අවශ්‍ය Build Parameters
export async function generateStaticParams() {
  return [
    { slug: "gta-v" },
    { slug: "cyberpunk-2077" },
    { slug: "god-of-war" },
    { slug: "red-dead-redemption-2" },
    { slug: "elden-ring" },
    { slug: "forza-horizon-5" },
    { slug: "the-witcher-3" },
  ];
}

// Helper to format clean search queries from slug
function formatQuery(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

// Helper to capitalize words for Titles
function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Dynamic SEO Metadata Generation for Google Search Engine Indexing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawQuery = formatQuery(slug);
  const formattedQuery = capitalizeWords(rawQuery);

  return {
    title: `Download ${formattedQuery} Repack - CyberHomeSimple`,
    description: `Get fast, direct repack search results for ${formattedQuery} on CyberHomeSimple. Direct magnet links with zero ads and shorteners.`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `Download ${formattedQuery} Repack - CyberHomeSimple`,
      description: `Find trusted repack download links and details for ${formattedQuery}.`,
      url: `https://cyberhomesimple.com/game/${slug}`,
      siteName: "CyberHomeSimple",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Download ${formattedQuery} Repack`,
      description: `Search results and direct magnet links for ${formattedQuery}.`,
    },
  };
}

// Main Page Component
export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const query = formatQuery(rawSlug);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-10">
      <AllInOneSearch initialQuery={query} />
    </main>
  );
}