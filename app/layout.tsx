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

export const metadata = {
  title: "AI Spend Audit — Find Hidden AI Tool Savings",

  description:
    "Find hidden savings across ChatGPT, Claude, Cursor, Gemini, and other AI tooling subscriptions.",

  openGraph: {
    title: "AI Spend Audit — Find Hidden AI Tool Savings",

    description:
      "Analyze ChatGPT, Claude, Cursor, Gemini, and other AI subscriptions to uncover overspending and optimization opportunities.",

    url: "credex-ai-audit-flax.vercel.app",

    siteName: "AI Spend Audit",

    type: "website",

    images: [
      "https://credex-ai-audit-flax.vercel.app/og-logo.png"
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AI Spend Audit — Find Hidden AI Tool Savings",

    description:
      "Analyze ChatGPT, Claude, Cursor, Gemini, and other AI subscriptions to uncover overspending and optimization opportunities.",
  },

  images: [
    "https://credex-ai-audit-flax.vercel.app/og-logo.png"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
