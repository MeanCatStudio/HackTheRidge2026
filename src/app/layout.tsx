import type { Metadata, Viewport } from "next";
import { Cedarville_Cursive, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Hack The Ridge 2026–2027",
  description: "Hack The Ridge 2026–2027 is a student-led hackathon at Iroquois Ridge High School in Oakville, Ontario.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
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
    <html lang="en" className={`${cedarvilleCursive.variable} ${shareTechMono.variable} w-full`}>
      <body className="antialiased w-full min-w-full">
        {children}
      </body>
    </html>
  );
}
