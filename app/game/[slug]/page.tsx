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

// Helper to format clean search queries from slug (eg: "elden-ring" -> "elden ring")
function formatQuery(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

// Helper to capitalize words for Titles (eg: "elden ring" -> "Elden Ring")
function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Dynamic SEO Metadata Generation for Google Search Engine Indexing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawQuery = formatQuery(slug);
  const formattedQuery = capitalizeWords(rawQuery);

  return {
    // High-Traffic Long-Tail Keywords සහිත Title එක
    title: `Download ${formattedQuery} Repack - Fast Direct Torrent & Magnet Links | CyberHomeSimple`,
    
    // Google Snippet එකේ පෙන්නන Detailed Description එක
    description: `Download verified PC game repack for ${formattedQuery}. Get high-speed direct torrent, magnet links, and pre-installed repacks with zero ads on CyberHomeSimple.`,
    
    // Target SEO Long-tail Keywords
    keywords: [
      `${formattedQuery} repack download`,
      `${formattedQuery} direct magnet link`,
      `${formattedQuery} torrent repack`,
      `${formattedQuery} pc game download`,
      `fitgirl ${formattedQuery}`,
      `dodi repack ${formattedQuery}`,
      `CyberHomeSimple`
    ],

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
      title: `Download ${formattedQuery} Repack - Direct Magnet Links | CyberHomeSimple`,
      description: `Get direct magnet links and verified repack search results for ${formattedQuery} on CyberHomeSimple.`,
      url: `https://cyberhomesimple.com/game/${slug}`,
      siteName: "CyberHomeSimple",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Download ${formattedQuery} Repack | CyberHomeSimple`,
      description: `Fast search results and direct magnet links for ${formattedQuery}.`,
    },
  };
}

// Main Page Component
export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "";
  const query = formatQuery(rawSlug);
  const formattedQuery = capitalizeWords(query);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-10">
      {/* Google Bot එකට On-Page Target Keyword එක හඳුනා ගැනීමට H1 Heading එකක් */}
      <h1 className="sr-only">
        Download {formattedQuery} PC Game Repack - Direct Magnet & Torrent Links
      </h1>

      <AllInOneSearch initialQuery={query} />
    </main>
  );
}