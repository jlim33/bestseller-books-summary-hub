import { NextRequest, NextResponse } from "next/server";
import { generateHealthSummary } from "@/lib/aiSummarizer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { title, content, category, apiKey, lang } = await req.json();
    const effectiveLang = lang === "en" ? "en" : "ko";

    const geminiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      const local = generateHealthSummary(title, content, category, effectiveLang);
      return NextResponse.json({ summary: local });
    }

    const prompt = effectiveLang === "en"
      ? `You are an elite clinical research analyst and preventative health physician. Summarize this medical study in 3 high-confidence bullet points and provide clinical mechanism and safety advice without hallucinating facts.
Title: ${title}
Category: ${category}
Content: ${content.slice(0, 1500)}

Respond in valid JSON only with keys:
"tldr": (array of 3 punchy clinical findings strings),
"clinicalContext": (string explaining physiological mechanism and longevity relevance),
"evidenceLevel": ("Level 1: Meta-Analysis & Systematic Review 🏆" | "Level 2: Randomized Controlled Trial (RCT) 🔬" | "Level 3: Long-term Cohort Clinical Study 📊" | "Level 4: Expert Clinical Consensus 🩺"),
"journalReference": (string, e.g. "Nature Medicine", "The Lancet", "Harvard Health"),
"safetyAndDosage": (string detailing safety caution or realistic lifestyle application),
"targetAudience": (array of strings, e.g. ["Adults 40+", "Sleep Seekers"])`
      : `당신은 최고 권위의 예방의학 및 임상 영양학 전문의입니다. 다음 의학 연구 논문 기사를 3줄로 요약하고 생리학적 메커니즘과 안전 섭취/생활 가이드를 제공해주세요 (환각/과장 배제).
제목: ${title}
카테고리: ${category}
본문: ${content.slice(0, 1500)}

반드시 다음 JSON 형식으로만 응답하세요:
{
  "tldr": ["핵심 발견 1", "핵심 발견 2", "핵심 발견 3"],
  "clinicalContext": "생리학적 메커니즘 및 장수의학적 시사점",
  "evidenceLevel": "1등급: 메타분석 & 체계적 고찰 🏆" | "2등급: 무작위 대조 임상시험 (RCT) 🔬" | "3등급: 대규모 임상 코호트 추적 📊" | "4등급: 의학 전문 학회 임상 권고 🩺",
  "journalReference": "인용 저널명 (예: The Lancet, Nature Medicine, 질병관리청)",
  "safetyAndDosage": "안전 섭취 및 생활습관 실천 유의사항",
  "targetAudience": ["성인 전 연령", "건강 관리자"]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const local = generateHealthSummary(title, content, category, effectiveLang);
      return NextResponse.json({ summary: local });
    }

    const data = await response.json();
    const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJsonText) {
      const local = generateHealthSummary(title, content, category, effectiveLang);
      return NextResponse.json({ summary: local });
    }

    const parsed = JSON.parse(rawJsonText);
    return NextResponse.json({ summary: parsed });
  } catch (err: any) {
    console.error("[API/Summarize] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
