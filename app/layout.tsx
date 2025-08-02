import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
