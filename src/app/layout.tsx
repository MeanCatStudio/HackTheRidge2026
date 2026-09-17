import type { Metadata, Viewport } from "next";
import { Cedarville_Cursive, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import "./review.css";
import CityTheme from "./components/CityTheme";

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cedarville-cursive",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hacktheridge.ca"),
  alternates: { canonical: "/" },
  title: "Hack The Ridge 2026",
  applicationName: "Hack The Ridge 2026",
  description: "Hack The Ridge 2026 is a student led hackathon at Iroquois Ridge High School in Oakville, Ontario.",
  openGraph: {
    url: "/",
    siteName: "Hack The Ridge 2026",
    title: "Hack The Ridge 2026",
    description: "Hack The Ridge 2026 is a student led hackathon at Iroquois Ridge High School in Oakville, Ontario.",
    type: "website",
    images: [{ url: "/2026Logo.png", alt: "Hack The Ridge 2026 logo" }],
  },
  twitter: {
    card: "summary",
    title: "Hack The Ridge 2026",
    description: "Hack The Ridge 2026 is a student led hackathon at Iroquois Ridge High School in Oakville, Ontario.",
    images: ["/2026Logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cedarvilleCursive.variable} ${shareTechMono.variable} w-full`} suppressHydrationWarning>
      <body className="antialiased w-full min-w-full">
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.cityTheme=localStorage.getItem('htr-city-theme')==='night'?'night':'day'}catch(e){document.documentElement.dataset.cityTheme='day'}" }} />
        <CityTheme>{children}</CityTheme>
      </body>
    </html>
  );
}
