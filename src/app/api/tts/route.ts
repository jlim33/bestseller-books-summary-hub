import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || "안녕하십니까. 오늘의 베스트셀러 요약입니다.";
    const voice = searchParams.get("voice") || "ko-male";
    const lang = voice.startsWith("en") ? "en" : "ko";

    // Clean text and truncate if too long for single chunk
    const cleanText = text
      .replace(/["""]/g, '"')
      .replace(/[''']/g, "'")
      .replace(/•/g, " ")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .trim()
      .slice(0, 200);

    const encoded = encodeURIComponent(cleanText);
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${lang}&client=tw-ob`;

    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    });

    if (!response.ok) {
      return new NextResponse("TTS stream fetch error", { status: 500 });
    }

    const audioArrayBuffer = await response.arrayBuffer();

    return new NextResponse(audioArrayBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: any) {
    console.error("TTS API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
