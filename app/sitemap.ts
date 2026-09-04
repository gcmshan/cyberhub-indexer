import { MetadataRoute } from 'next';

export const dynamic = 'force-static'; // <--- මෙන්න මේ පේළිය එක් කරන්න

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cyberhub-indexer.pages.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}