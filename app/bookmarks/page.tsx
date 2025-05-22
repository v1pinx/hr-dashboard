"use client";
import { useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import { useEmployees } from "../hooks/useEmployees";
import Loader from "../components/Loader";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import EmployeeCard from "../components/EmployeeCard";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { employees, loading, error } = useEmployees();

  const bookmarkedEmployees = employees.filter((emp: any) =>
    bookmarks.includes(emp.id)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    const err = error as Error;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">
            Error loading bookmarks
          </h2>
          <p className="text-gray-400">{err.message}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Bookmarked Employees
              </h1>
              <p className="text-gray-400 mt-1">
                {bookmarkedEmployees.length} employee
                {bookmarkedEmployees.length !== 1 ? "s" : ""} bookmarked
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {bookmarkedEmployees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto bg-gray-100  rounded-full flex items-center justify-center">
                <Bookmark className="h-10 w-10 text-gray-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  No bookmarked employees
                </h2>
                <p className="text-gray-400">
                  Start bookmarking employees to keep track of your favorites
                  and access them quickly.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-600 rounded-lg hover:bg-zinc-800 transition-colors font-medium"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedEmployees.map((emp: any) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
