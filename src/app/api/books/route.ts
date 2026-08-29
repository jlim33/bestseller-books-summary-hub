import { NextResponse } from "next/server";
import { BESTSELLER_BOOKS_KO, BESTSELLER_BOOKS_EN } from "@/lib/booksData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "ko";
  const category = searchParams.get("category");

  let books = locale === "en" ? BESTSELLER_BOOKS_EN : BESTSELLER_BOOKS_KO;

  if (category && category !== "all") {
    books = books.filter((b) => b.category === category);
  }

  return NextResponse.json({
    status: "ok",
    total: books.length,
    locale,
    books,
  });
}
