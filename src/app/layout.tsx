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
        {/* ==================== UBIQUITARIAN BRAND BANNER ==================== */}
        <aside className="ubiquitarian-banner" style={{ background: 'linear-gradient(90deg, #090d16 0%, #111827 50%, #090d16 100%)', color: '#cbd5e1', fontSize: '12px', fontWeight: 600, textAlign: 'center', padding: '7px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 99999, position: 'relative', letterSpacing: '0.02em', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px' }}>🌐</span>
            <span>Powered by</span>
            <a href="https://www.ubiquitarian.info" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
              Ubiquitarian.info
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>↗</span>
            </a>
          </span>
        </aside>
        {children}
      </body>
    </html>
  );
}
