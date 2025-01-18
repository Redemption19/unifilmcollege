import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const font = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Unifilm College',
    template: '%s | Unifilm College'
  },
  description: "Ghana's Premier Film & Creative Arts Institution",
  keywords: ['film school', 'media studies', 'ghana', 'creative arts', 'journalism'],
  authors: [{ name: 'Unifilm College' }],
  creator: 'Unifilm College',
  publisher: 'Unifilm College',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://unifilmcollege.com',
    siteName: 'Unifilm College',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Unifilm College'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
