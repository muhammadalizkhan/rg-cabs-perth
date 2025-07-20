import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RG Cabs Perth",
    template: "%s | RG Cabs Perth",
  },
  description: "RG Cabs Perth offers reliable, affordable, and safe taxi services including airport transfers, baby seat cabs, and more.",
  keywords: ["Perth taxi", "airport transfer Perth", "baby seat cab", "RG Cabs Perth", "Perth cab service","book taxi Perth"],
  metadataBase: new URL("https://rgcabsperth.com.au"),
  openGraph: {
    title: "RG Cabs Perth - Reliable Taxi Services",
    description: "Fast and safe taxi services in Perth. Book online for airport rides, baby seats, and more.",
    url: "https://rgcabsperth.com.au",
    siteName: "RG Cabs Perth",
    images: [
      {
        url: "https://rgcabsperth.com.au/og-image.jpg", // Replace with real image
        width: 1200,
        height: 630,
        alt: "RG Cabs Perth",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RG Cabs Perth - Taxi Service",
    description: "Safe and affordable cab service in Perth with airport pickup, baby seat cabs, and more.",
  },
  icons: {
    icon: "/favicon.icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
