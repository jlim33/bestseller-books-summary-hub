import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitaPulse | Evidence-Based Health, Nutrition & Longevity Intelligence",
  description: "Peer-reviewed medical research, clinical longevity insights, and relaxing ambient audio lounge.",
  keywords: ["health news", "evidence based medicine", "the lancet", "nature medicine", "longevity", "microbiome", "vitapulse"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-sage-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
