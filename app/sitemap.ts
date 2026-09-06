import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cyberhomesimple.com";

  let gameSlugs: string[] = [
    "gta-v",
    "cyberpunk-2077",
    "god-of-war",
    "red-dead-redemption-2",
    "elden-ring",
    "forza-horizon-5",
    "the-witcher-3",
  ];

  try {
    const res = await fetch("https://withered-moon-9290.gcmshan.workers.dev/api/games-list");
    if (res.ok) {
      const data = await res.json();
      if (data?.slugs && Array.isArray(data.slugs) && data.slugs.length > 0) {
        gameSlugs = data.slugs;
      }
    }
  } catch (error) {
    console.error("Sitemap API Fetch Error:", error);
  }

  const gameUrls: MetadataRoute.Sitemap = gameSlugs.map((slug) => ({
    url: `${baseUrl}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

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