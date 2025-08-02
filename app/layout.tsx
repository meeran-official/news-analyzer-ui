import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "./contexts/SettingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Analyzer - AI-Powered News Topic Analysis",
  description: "Analyze trending news topics with AI-powered insights, viewpoints, and historical perspectives. Get comprehensive analysis on any news subject.",
  keywords: ["news analysis", "AI", "current events", "topic analysis", "news insights"],
  authors: [{ name: "Meeran" }],
  openGraph: {
    title: "News Analyzer - AI-Powered News Topic Analysis",
    description: "Analyze trending news topics with AI-powered insights, viewpoints, and historical perspectives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Analyzer - AI-Powered News Topic Analysis",
    description: "Analyze trending news topics with AI-powered insights, viewpoints, and historical perspectives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getSystemTheme() {
                  if (typeof window === 'undefined') return 'light';
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                function getResponsiveTheme() {
                  const isMobile = window.innerWidth < 768;
                  return getSystemTheme(); // Respect system preference on all devices
                }
                
                try {
                  const savedTheme = localStorage.getItem('news-analyzer-theme');
                  const theme = savedTheme || getResponsiveTheme();
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}