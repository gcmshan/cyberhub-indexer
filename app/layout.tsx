import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CyberHub Games - Search & Index Free Games',
  description: 'Search and find games from trusted repackers with high quality cover art and direct links.',
  keywords: ['games indexer', 'fitgirl repacks', 'dodi repacks', 'steamrip', 'free games search', 'cyberhub'],
  authors: [{ name: 'CyberHub' }],
  openGraph: {
    title: 'CyberHub Games Indexer',
    description: 'Find trusted game repack links instantly.',
    url: 'https://cyberhub.site',
    siteName: 'CyberHub Games',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}