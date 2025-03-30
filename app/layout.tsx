import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Dev Blog',
    template: '%s | Dev Blog'
  },
  description: 'Exploring the world of software development, one post at a time',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Dev Blog',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourtwitterhandle',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.PROJECT_LEVEL === 'production';

  return (
    <html lang="en">
      <head>
        {isProduction && (
          <>
            {/* <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script> */}
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
              crossOrigin="anonymous"
            ></script>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5705279968058278"     crossOrigin="anonymous"></script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Left Sidebar Ads */}
          {isProduction && (
            <aside className="hidden lg:block w-64 p-4">
              <div className="sticky top-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                  data-ad-slot="LEFT_SIDEBAR_SLOT_ID"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Right Sidebar Ads */}
          {isProduction && (
            <aside className="hidden lg:block w-64 p-4">
              <div className="sticky top-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                  data-ad-slot="RIGHT_SIDEBAR_SLOT_ID"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </aside>
          )}
        </div>
        <Analytics />
      </body>
    </html>
  );
}