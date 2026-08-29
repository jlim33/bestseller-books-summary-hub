import { useState, useEffect, useCallback } from "react";
import { getStoredBookmarks, setStoredBookmarks } from "@/lib/storage";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      setStoredBookmarks(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => {
      return bookmarks.includes(id);
    },
    [bookmarks]
  );

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    bookmarkCount: bookmarks.length,
  };
}
