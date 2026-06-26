import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { portfolioData } from "@/data/portfolioData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${portfolioData.name} | AI Engineer & Software Creator`,
  description: portfolioData.objective,
  authors: [{ name: portfolioData.fullName }],
  keywords: ["AI Engineer", "Generative AI", "RAG", "LLM", "Python", "Flask", "ChromaDB", "Groq API", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#030307] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
