import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'react-modern-drawer/dist/index.css'
import { Providers } from "@/src/providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
