import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "BookPulse - 베스트셀러 챕터별 완벽 요약 허브 | Chapter-by-Chapter Hub",
  description:
    "AI, 자연과학, 철학, 수학, 의학 및 건강, 습관 교양 등 글로벌 명저의 전 챕터 심층 요약, 핵심 멘탈 모델, 실천 지침 및 힐링 배경음악 오디오 라운지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`} suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans antialiased selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
