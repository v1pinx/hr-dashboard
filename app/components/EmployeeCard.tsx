"use client";

import { getPerformanceColor } from "@/app/lib/utils";
import {
  Star,
  StarHalf,
  Bookmark,
  MoreHorizontal,
  Users,
  ArrowUpRight,
  Calendar,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import { useBookmarks } from "@/app/context/BookmarkContext";
import { useState, useRef, useEffect } from "react";

export default function EmployeeCard({ employee }) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarks.includes(employee.id);

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 shadow-sm hover:shadow-lg transition-shadow duration-300 w-full max-w-xs light:bg-white  dark:border-neutral-700">
      {/* Header with department tag */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
          {employee.company.department}
        </span>
        <button
          onClick={() => toggleBookmark(employee.id)}
          className="h-8 w-8 inline-flex items-center justify-center rounded-full cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Bookmark
            className={`h-4 w-4 ${
              isBookmarked ? "fill-white" : "text-zinc-400"
            }`}
          />
          <span className="sr-only">
            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
          </span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4 flex flex-col items-center">
        <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800 shadow-sm mb-3">
          <img
            src={employee.image || "/api/placeholder/100/100"}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h3>

          {/* Rating Badge Section */}
          <div
            className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${getPerformanceColor(employee.performanceRating)}20`,
              color: getPerformanceColor(employee.performanceRating),
            }}
          >
            <div className="flex items-center">
              <span className="mr-1">{employee.performanceRating.toFixed(1)}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < Math.floor(employee.performanceRating)) {
                    return <Star key={i} className="h-3 w-3  fill-current" />;
                  } else if (
                    i < Math.ceil(employee.performanceRating) &&
                    !Number.isInteger(employee.performanceRating)
                  ) {
                    return (
                      <StarHalf key={i} className="h-3 w-3  fill-current" />
                    );
                  }
                  return <Star key={i} className="h-3 w-3 text-red-600" />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800 mx-6" />

      {/* Info Section */}
      <div className="px-6 py-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center space-x-3">
          <Mail className="h-4 w-4 text-zinc-500" />
          <span className="truncate max-w-[200px]">{employee.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="h-4 w-4 text-zinc-500" />
          <span>Age: {employee.age}</span>
        </div>
        {employee.phone && (
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-zinc-500" />
            <span>{employee.phone}</span>
          </div>
        )}
        {employee.company.title && (
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-zinc-500" />
            <span>{employee.company.title}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-zinc-200 dark:border-zinc-800 light:bg-zinc-50  rounded-b-lg">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-zinc-800 bg-black text-white cursor-pointer hover:bg-zinc-800 transition-colors">
          View Profile
        </button>

        {/* Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-zinc-800 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5 text-zinc-500" />
            <span className="sr-only">More options</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 bottom-full mb-2 z-50 min-w-[10rem] overflow-hidden rounded-md border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-lg">
              <button className="relative flex w-full select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                <span>Promote</span>
              </button>
              <button className="relative flex w-full select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Users className="mr-2 h-4 w-4" />
                <span className="truncate">Assign to Project</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
