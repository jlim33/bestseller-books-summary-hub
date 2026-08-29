"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroFeatured } from "@/components/HeroFeatured";
import { BookCard } from "@/components/BookCard";
import { BookDetailModal } from "@/components/BookDetailModal";
import { DailyBriefingModal } from "@/components/DailyBriefingModal";
import { BookmarksDrawer } from "@/components/BookmarksDrawer";
import { BESTSELLER_BOOKS_KO } from "@/lib/booksData";
import { BookItem } from "@/lib/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { BookOpen, Sparkles, SlidersHorizontal, Layers, Award } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "readTime" | "chapters">("rating");
  
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  const { bookmarks, toggleBookmark, isBookmarked, bookmarkCount } = useBookmarks();

  // Category Book Counts
  const bookCounts = useMemo(() => {
    const counts: Record<string, number> = { all: BESTSELLER_BOOKS_KO.length };
    BESTSELLER_BOOKS_KO.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered & Sorted Books
  const filteredBooks = useMemo(() => {
    return BESTSELLER_BOOKS_KO.filter((book) => {
      const matchCategory = selectedCategory === "all" || book.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.oneLinerThesis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.keyMentalModels.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.chapters.some((c) => c.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "readTime") return a.totalReadTimeMinutes - b.totalReadTimeMinutes;
      if (sortBy === "chapters") return b.chapters.length - a.chapters.length;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredBook = BESTSELLER_BOOKS_KO[0]; // Life 3.0 or top rated

  const bookmarkedBooksList = useMemo(() => {
    return BESTSELLER_BOOKS_KO.filter((b) => bookmarks.includes(b.id));
  }, [bookmarks]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locale="ko"
        bookmarkCount={bookmarkCount}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenBriefing={() => setIsBriefingOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Category Navigation Bar */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          locale="ko"
          bookCounts={bookCounts}
        />

        {/* Hero Featured Book (When viewing All category & no search) */}
        {selectedCategory === "all" && searchQuery === "" && (
          <HeroFeatured
            book={featuredBook}
            onOpenBook={setSelectedBook}
            locale="ko"
          />
        )}

        {/* Filter / Sort Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pt-2">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <span>📚</span>
              <span>
                {selectedCategory === "all"
                  ? "추천 명저 챕터별 완벽 요약"
                  : `${filteredBooks[0]?.categoryLabel || "분야별"} 핵심 도서 요약`}
              </span>
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              {filteredBooks.length}권의 도서
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold self-end sm:self-auto">
            <span className="text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              정렬:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:border-amber-500 font-medium"
            >
              <option value="rating">⭐ 평점 높은 순</option>
              <option value="readTime">⏱️ 완독 시간 짧은 순</option>
              <option value="chapters">📖 챕터 많은 순</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 stroke-1 mb-3" />
            <p className="font-bold text-slate-600 dark:text-slate-400">
              일치하는 도서 요약을 찾을 수 없습니다.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              검색어나 카테고리 필터를 변경해 보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onOpenBook={setSelectedBook}
                isBookmarked={isBookmarked(book.id)}
                onToggleBookmark={toggleBookmark}
                locale="ko"
              />
            ))}
          </div>
        )}

      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isBookmarked={isBookmarked(selectedBook.id)}
          onToggleBookmark={toggleBookmark}
          locale="ko"
        />
      )}

      {/* Daily 5-Min Executive Digest Modal */}
      {isBriefingOpen && (
        <DailyBriefingModal
          books={BESTSELLER_BOOKS_KO}
          onClose={() => setIsBriefingOpen(false)}
          locale="ko"
          onSelectBook={setSelectedBook}
        />
      )}

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedBooks={bookmarkedBooksList}
        onSelectBook={setSelectedBook}
        onRemoveBookmark={toggleBookmark}
        locale="ko"
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 py-8 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 dark:text-white">BookPulse</span>
            <span>—</span>
            <span>AI, 과학, 철학, 수학, 의학, 습관 베스트셀러 챕터별 완벽 요약 허브</span>
          </div>
          <p>© 2026 BookPulse. Powered by Next.js 14, Web Audio & Web Speech APIs.</p>
        </div>
      </footer>

    </div>
  );
}
