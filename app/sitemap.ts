import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cyberhomesimple.com";
  let gameSlugs: string[] = [];

  try {
    // Cloudflare Worker API එකෙන් Dynamic Games Slugs Fetch කිරීම
    const res = await fetch("https://withered-moon-9290.gcmshan.workers.dev/api/games-list", {
      next: { revalidate: 3600 } // තත්පර 3600 කට (පැයකට) වරක් Cache Revalidate වේ
    });

    if (res.ok) {
      const data = await res.json();
      gameSlugs = data.slugs || [];
    }
  } catch (error) {
    console.error("Sitemap API Fetch Error:", error);
    // Worker එක Down වුවහොත් භාවිත වන Fallback Slugs
    gameSlugs = ["gta-v", "cyberpunk-2077", "god-of-war", "elden-ring"];
  }

  // සියලුම Slugs සඳහා Dynamically URLs Generate කිරීම (/game/slug-name)
  const gameUrls: MetadataRoute.Sitemap = gameSlugs.map((slug) => ({
    url: `${baseUrl}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Home Page එක සහ Game Pages සියල්ල සිතියමට එකතු කර Return කිරීම
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...gameUrls,
  ];
}