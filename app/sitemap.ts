import { MetadataRoute } from "next";

// Next.js Static Export එකට මෙය Pure Static Route එකක් බව පැවසීම
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cyberhomesimple.com";

  // Static Game Slugs List එක (Static Export සඳහා Build-time එකේදී Direct යෙදීම)
  const gameSlugs = [
    "gta-v",
    "cyberpunk-2077",
    "god-of-war",
    "red-dead-redemption-2",
    "elden-ring",
    "forza-horizon-5",
    "the-witcher-3",
  ];

  const gameUrls: MetadataRoute.Sitemap = gameSlugs.map((slug) => ({
    url: `${baseUrl}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...gameUrls,
  ];
}