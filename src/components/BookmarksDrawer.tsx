"use client";

import React from "react";
import {
  X,
  Bookmark,
  BookOpen,
  Trash2,
  ChevronRight,
  Clock
} from "lucide-react";
import { BookItem } from "@/lib/types";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedBooks: BookItem[];
  onSelectBook: (book: BookItem) => void;
  onRemoveBookmark: (id: string) => void;
  locale?: "ko" | "en";
}

export function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedBooks,
  onSelectBook,
  onRemoveBookmark,
  locale = "ko",
}: BookmarksDrawerProps) {
  const isEn = locale === "en";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {isEn ? "My Reading Library" : "내 서재 & 보관함"}
                </h3>
                <p className="text-xs text-slate-400">
                  {bookmarkedBooks.length} {isEn ? "books saved" : "권의 도서 저장됨"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Book List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {bookmarkedBooks.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
                <BookOpen className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
                <p className="text-sm font-bold">{isEn ? "Your library is empty" : "보관된 도서가 없습니다."}</p>
                <p className="text-xs mt-1">{isEn ? "Bookmark books to read chapter summaries later" : "관심 있는 도서의 북마크 아이콘을 클릭해보세요."}</p>
              </div>
            ) : (
              bookmarkedBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 group hover:border-amber-400 transition-all"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectBook(book);
                    }}
                    className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600">
                        {book.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {book.author}
                      </p>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {book.chapters.length} Chapters ({book.totalReadTimeMinutes}m)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(book.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    title={isEn ? "Remove" : "삭제"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
