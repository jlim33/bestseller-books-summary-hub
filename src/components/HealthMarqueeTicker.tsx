"use client";

import React, { useState } from "react";
import { Sparkles, Award, Microscope, HeartPulse, Activity, Brain } from "lucide-react";
import { HealthTickerItem } from "@/lib/types";

const INITIAL_HEALTH_TICKER: HealthTickerItem[] = [
  { id: "1", title: "Nature Medicine: Replicated Human Trial Confirms Telomere Protection via Polyphenol Diet", journal: "Nature Medicine (2025)", category: "longevity", evidenceGrade: "RCT 🔬", timeAgo: "15m ago" },
  { id: "2", title: "The Lancet Meta-Analysis: 34% Cardiovascular Risk Reduction with Plant-Rich Omega Profile", journal: "The Lancet", category: "cardio", evidenceGrade: "Meta-Analysis 🏆", timeAgo: "30m ago" },
  { id: "3", title: "Harvard Health: 7.5h Circadian Synchronization Accelerates Glymphatic Brain Detoxification", journal: "Harvard Health", category: "neuro", evidenceGrade: "Clinical Cohort 📊", timeAgo: "1h ago" },
  { id: "4", title: "JAMA Clinical Trial: Intermittent Fasting Combined with Resistance Training Preserves Muscle Mass", journal: "JAMA Network", category: "nutrition", evidenceGrade: "RCT 🔬", timeAgo: "2h ago" },
  { id: "5", title: "Cell Metabolism: Microbiome Diversity Key to Regulating Systemic Inflammatory Biomarkers", journal: "Cell Metabolism", category: "nutrition", evidenceGrade: "Multi-Cohort 📊", timeAgo: "3h ago" },
];

export function HealthMarqueeTicker({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const [tickerItems] = useState<HealthTickerItem[]>(INITIAL_HEALTH_TICKER);
  const isEn = locale === "en";

  return (
    <div className="w-full bg-sage-950 text-white border-b border-sage-900 overflow-hidden py-2 px-4 flex items-center gap-3 text-xs">
      
      {/* Live Badge */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sage-600/30 border border-sage-500/50 text-sage-300 font-extrabold tracking-wider uppercase shrink-0 shadow-xs animate-pulse-subtle">
        <Sparkles className="w-3.5 h-3.5 text-sage-400" />
        <span>{isEn ? "Evidence-Based Medical Pulse" : "최신 동료검증 논문 속보"}</span>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden flex-1 group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] gap-8">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="inline-flex items-center gap-2 text-slate-300 font-medium select-none"
            >
              <span className="px-2 py-0.2 rounded text-[10px] font-black uppercase font-mono bg-sage-500/20 text-sage-300 border border-sage-500/30">
                [{item.journal}]
              </span>

              <span className="font-bold text-slate-200 text-xs">
                {item.title}
              </span>

              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-lavender-500/20 text-lavender-300 border border-lavender-500/30">
                {item.evidenceGrade}
              </span>

              <span className="text-[10px] font-mono text-slate-400">
                {item.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
