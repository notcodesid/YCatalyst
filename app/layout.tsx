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
  title: "YCatalyst",
  description: "Your one-stop database for all Y Combinator startups, offering quick access to essential company information, founder details, and funding data.",
  metadataBase: new URL("https://ycatalyst.notcodesid.xyz/"),
  openGraph: {
    title: "YCatalyst",
    description: "Your one-stop database for all Y Combinator startups, offering quick access to essential company information, founder details, and funding data.",
    url: "https://ycatalyst.notcodesid.xyz/",
    siteName: "YCatalyst",
    images: [
      {
        url: "/ycatalyst.png",
        width: 1200,
        height: 630,
      },
    ],  
    locale: "en-IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "YCatalyst",
    description: "Your one-stop database for all Y Combinator startups, offering quick access to essential company information, founder details, and funding data.",
    images: ["/ycatalyst.png"],
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
      >
        {children}
      </body>
    </html>
  );
}
