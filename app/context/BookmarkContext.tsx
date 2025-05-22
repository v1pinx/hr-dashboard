"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context
interface BookmarksContextType {
  bookmarks: string[];
  toggleBookmark: (employeeId: string) => void;
}

// Create the context with default null
const BookmarksContext = createContext<BookmarksContextType | null>(null);

// Define the props for the provider
interface BookmarksProviderProps {
  children: ReactNode;
}

export function BookmarksProvider({ children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("hr-dashboard-bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks:", error);
        setBookmarks([]);
      }
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("hr-dashboard-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (employeeId: string) => {
    setBookmarks((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks(): BookmarksContextType {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }

  return context;
}
