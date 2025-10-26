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
  title: "Bolt Lovable | AI Orchestrated Web Creation",
  description:
    "Bolt Lovable blends template intelligence, multi-AI orchestration, and Supabase collaboration to build lovable web experiences.",
  metadataBase: new URL("https://agentic-84b5e970.vercel.app"),
  openGraph: {
    title: "Bolt Lovable",
    description:
      "Ship better experiences with a curated template library, AI workflow orchestration, and collaborative Supabase-powered tooling.",
    type: "website",
    url: "https://agentic-84b5e970.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt Lovable",
    description:
      "Design, orchestrate, debug, and deploy with AI-assisted workspace connected to Supabase.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#f4f7fb]">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
